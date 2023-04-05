import React, { useCallback, useMemo } from "react";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor } from "slate";

import Leaf from "./Leaf";
import DivWithBorderElement from "./editorComponents/DivWithBorderElement";
import DefaultElement from "./editorComponents/DefaultElement";

import { handleKeyDown } from "./utils/HandleKeyDown";
import Toolbar from "./utils/Toolbar";
import AccordionElement from "./editorComponents/AccordionElement";


const Editor = () => {
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

    if(element.type === "accordion"){
        return <AccordionElement {...props} />
    }
    return <DefaultElement {...props} />;
  }, []);







  return (
    <div>
      <Slate editor={editor} value={initialValue}>
        <Toolbar editor={editor} />
        <Editable
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          onKeyDown={(event) => handleKeyDown(event, editor)}
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
    {
        type: "divWithBorder",
        children: [
            {
                type: "paragraph",
                children: [{ text: "" }],
            },
        ],
    },
    {
        type: "accordion",
        children: [
            {
                type: "paragraph",
                children: [{ text: "Im some text inside an accordion" }],
            },

        ],
    },
];

export default Editor;