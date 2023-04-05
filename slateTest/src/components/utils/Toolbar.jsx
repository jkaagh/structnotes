import React from "react";
import { toggleBold, toggleItalic } from "./Marks";
import { insertDivWithBorder } from "./Inserters";


const Toolbar = ({ editor }) => {
  return (
    <div>
      <button onMouseDown={(event) => toggleBold(event, editor)}>Bold</button>
      <button onMouseDown={(event) => toggleItalic(event, editor)}>Italic</button>
      <button onMouseDown={() => insertDivWithBorder(editor)}>Insert Div</button>
    </div>
  );
};

export default Toolbar;