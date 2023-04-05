import React, { useMemo, useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

const SimpleSlateEditor = () => {
  // Define the initial state of the editor.
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A simple Slate.js editor." }],
    },
  ]);

  // Create the Slate.js editor instance.
  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <Slate editor={editor} value={value} onChange={(newValue) => setValue(newValue)}>
      <Editable />
    </Slate>
  );
};

export default SimpleSlateEditor;