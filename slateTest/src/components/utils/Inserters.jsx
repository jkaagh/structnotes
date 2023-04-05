
// Create a function that inserts the custom element. This function is called from a buttonclick in the Toolbar. 

import { Editor, Transforms } from "slate";

export const insertDivWithBorder = (editor) => {

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
      children: [{ text: "" }],
    };
    const point = Editor.end(editor, editor.selection);
    
    //when this is called, inserts a divwithborder component on the cursor, and a paragraph right after. This is for UX's sake, especially on mobile. 
    Transforms.insertNodes(editor, paragraph, { at: Editor.after(editor, point) });
    Transforms.insertNodes(editor, divWithBorder, { at: point });
    Transforms.select(editor, point);
    // Transforms.select(editor, [...point, 0, 0]); // This line selects the inside of the newly created div

  };