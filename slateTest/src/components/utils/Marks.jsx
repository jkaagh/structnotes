import { Editor } from "slate";

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleBold = (event, editor) => {
  event.preventDefault();
  const isActive = isMarkActive(editor, "bold");
  if (isActive) {
    Editor.removeMark(editor, "bold");
  } else {
    Editor.addMark(editor, "bold", true);
  }
};

export const toggleItalic = (event, editor) => {
  event.preventDefault();
  const isActive = isMarkActive(editor, "italic");
  if (isActive) {
    Editor.removeMark(editor, "italic");
  } else {
    Editor.addMark(editor, "italic", true);
  }
};
