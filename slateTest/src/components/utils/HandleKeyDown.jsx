import { Editor, Node, Path, Transforms } from "slate";

export const handleKeyDown = (event, editor) => {
    if (!event.ctrlKey || event.key !== "Enter") {
      return;
    }
  
    const paragraph = {
      type: "paragraph",
      children: [{ text: "" }],
    };
    
    //handles ctrl+enter while on root level.
    if (Editor.path(editor, editor.selection.anchor).length === 2) {
      const point = Editor.end(editor, editor.selection); //gets the end of the current selection
      Transforms.insertNodes(editor, paragraph, { at: point });
  
      const nextPoint = Editor.after(editor, point); //gets the point right after the end of the selection
      Transforms.select(editor, nextPoint);
      return;
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
  };