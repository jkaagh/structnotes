import React, { useMemo, useState, useCallback } from "react";
import { createEditor, Transforms, Editor, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";


const Toolbar = ({ editor }) => {
    const toggleBold = (event) => {
        event.preventDefault();
        const isActive = editor.selection && Editor.marks(editor).bold === true;
        Transforms.setNodes(
          editor,
          { bold: !isActive },
          { match: (n) => Text.isText(n), split: true }
        );
      };
  
    return (
      <div>
        <button onMouseDown={toggleBold}>Bold</button>
      </div>
    );
  };




const SimpleSlateEditor = () => {
  // Define the initial state of the editor.
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A simple Slate.js editor." }],
    },
  ]);



  /*To properly render the bold text in the editor, we also need to update the 
  Editable component to apply the desired styling for bold text. You can do this 
  by passing a custom renderLeaf function:
  */
  const renderLeaf = useCallback(({ attributes, children, leaf }) => {
    if (leaf.bold) {
      return <strong {...attributes}>{children}</strong>;
    }
  
    return <span {...attributes}>{children}</span>;
  }, []);




  // Create the Slate.js editor instance.
  const editor = useMemo(() => withReact(createEditor()), []);




  return (
    <>
        <Toolbar/>
        <Slate editor={editor} value={value} onChange={(newValue) => setValue(newValue)}>
        <Editable renderLeaf={renderLeaf} />
        </Slate>
    </>
  );
};

export default SimpleSlateEditor;