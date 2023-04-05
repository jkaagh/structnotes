import React, { useCallback, useMemo } from "react";
import { Editable, withReact,  Slate } from "slate-react";
import { createEditor, Editor, Transforms, Path, Node } from "slate";


const Toolbar = ({ editor }) => {
    const toggleBold = (event) => {
      event.preventDefault();
      const isActive = isMarkActive(editor, "bold");
      if (isActive) {
        Editor.removeMark(editor, "bold");
      } else {
        Editor.addMark(editor, "bold", true);
      }
    };

    const toggleItalic = (event) => {
        event.preventDefault()
        const isActive = isMarkActive(editor, "italic") //these marks are customly named, and in the leaf function i define how they would act.
        if (isActive) {
            Editor.removeMark(editor, "italic");
          } else {
            Editor.addMark(editor, "italic", true);
          }
    }

 

  return (
    <div>
      <button onMouseDown={toggleBold}>Bold</button>
      <button onMouseDown={toggleItalic}>Italic</button>
      <button onMouseDown={() => insertDivWithBorder(editor)}>Insert Div</button> 
    
    </div>
  );
};


//convenience function used in the toolbar
const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};


/*
here i define how different marks are being rendered. 

A leaf in Slate.js represents the lowest level of nodes in the document tree. 
It is an object that contains text and any associated marks, such as bold, italic, etc. 
Leaves cannot have children, as they are the most basic unit of content in the editor.
*/
const Leaf = (props) => {
    let { attributes, children, leaf } = props;
    
    
    if (leaf.bold) {
      children = <strong>{children}</strong>;
    }

    //when the document is rendered, anything that has the mark "italic" will be italic. 
    if(leaf.italic) {
        children = <em>{children}</em> //i'm fairly sure i could have this be an entire <Component/>, as long as there is {children} inside (and only one of them)
    }


    //test to see how modable this is. leafs cannot have children so this ends up being a bit wonky.
    // if(leaf.test){
    //     children = <div style={{padding: "5px", border: "1px solid black"}}>{children}</div>
    // }
  
    return <span {...attributes}>{children}</span>;
};






/*
Define a new custom element type. This is just a normal react component and i can add as much shit inside it as i want,
as long as the {children} is there somewhere. 

*/
const DivWithBorderElement = ({ attributes, children }) => {
    return (
      <div
        {...attributes}
        style={{
          border: "1px solid black",
          borderRadius: "5px",
          padding: "10px",
          margin: "10px 0",
        }}
      >
        {children}
      </div>
    );
  };


  // the default element if no other is specified. 
const DefaultElement = (props) => {
    const { attributes, children } = props;
    return <div {...attributes}>{children}</div>;
};
  


// Create a function that inserts the custom element. This function is called from a buttonclick in the Toolbar. 

const insertDivWithBorder = (editor) => {

    /*
    The DivWithBorderElement component is for rendering the element, 
    while the insertDivWithBorder function is for defining the 
    element's structure and inserting it into the editor.
    */


    //this is a slateJS node structure, which this function inserts into the node tree. Here we define what it looks like.
    //the node tree is seperate from the actual html and javascript i browser shows, the node tree is just how it's stored.
    const divWithBorder = {
        type: "divWithBorder",
        children: [
            {
              type: "paragraph",
              children: [{ text: "" }],
            },
          ],
    };
    const paragraph = { 
        type: "paragraph", 
        children: [{ text: "" }] 
    };
    const point = Editor.end(editor, editor.selection);
    
    


    //when this is called, inserts a divwithborder component on the cursor, and a paragraph right after. This is for UX's sake, especially on mobile. 
    Transforms.insertNodes(editor, paragraph, {at: Editor.after(editor, point)})
    Transforms.insertNodes(editor, divWithBorder, { at: point });
    Transforms.select(editor, point); 
    // Transforms.select(editor, [...point, 0, 0]); // This line selects the inside of the newly created div
};




const App = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  //works the same way as the renderLeaf, but here i just have it all inside instead of putting it inside it's own component. 
  //but it works the same way, checks which element.type it sees and shits out the component or functionality i want. exactly the same as if(leaf.bold)
  const renderElement = useCallback((props) => {
    const { element } = props;

    //checks the slate node tree, and if it finds a node called "divWithBorder", it will render whatever i put in the return function.
    if (element.type === "divWithBorder") {
      return <DivWithBorderElement {...props} />;
    }
    return <DefaultElement {...props} />;
  }, []);


    const onKeyDown = useCallback((event) => {
        if (!event.ctrlKey || event.key !== "Enter") {
            return;
        }


        console.log(Editor.path(editor, editor.selection.anchor).length)
        
        const paragraph = {
            type: "paragraph",
            children: [{ text: "" }],
        };


        //handles ctrl+enter while on root level.
        if(Editor.path(editor, editor.selection.anchor).length === 2){
            const point = Editor.end(editor, editor.selection); //gets the end of the current selection
            Transforms.insertNodes(editor, paragraph, { at: point });

            const nextPoint = Editor.after(editor, point); //gets the point right after the end of the selection
            Transforms.select(editor, nextPoint);
            return
        }


       

        /*
              //
              Document (root)
              ├── [0] Paragraph 1
              ├── [1] Div with border
              │   ├── [1, 0] Text node inside the div, our caret is here.
              └── [2] null, doesnt exist
        */

        const path = Editor.path(editor, editor.selection.anchor); // [1, 0], gets the text node. 
        //this actually returns [1, 0, 0], the last 0 is the index of the text node inside the paragraph. that makes no fucking sense but the thing below works.
        
        const parentPath = Path.parent(Path.parent(path)); // [1] gets the actual div element it's inside of 
        const nextPath = Path.next(parentPath); // [2] gets the path below the border element.



        // Check if the next path exists in the document
        if (!Node.has(editor, nextPath)) {
            // If the next path doesn't exist, insert a new paragraph there.
            Transforms.insertNodes(editor, paragraph, { at: nextPath });
          }

        const pointAfterInsert = Editor.after(editor, parentPath);

        if (pointAfterInsert) {
            Transforms.select(editor, pointAfterInsert);
        } else {
            Transforms.select(editor, nextPath);
        }
    },
    
    [editor]
  );



  return (
    <div>
      <Slate editor={editor} value={initialValue}>
        <Toolbar editor={editor}/>
        {/* <div style={{margin: "10px"}}>
            asdaasdasdasd //literally everything probably needs to be inside this..?
        </div> */}
        <Editable 
        renderLeaf={renderLeaf} 
        renderElement={renderElement} 
        onKeyDown={onKeyDown}
        />
      </Slate>
    </div>
  );
};

const initialValue = [
  {
    type: "paragraph",
    children: [
      { text: "This is an editable paragraasdasdph. " },
      { text: "You can make text ", bold: true },
      { text: "bold." },
    ],
  },
];

export default App;