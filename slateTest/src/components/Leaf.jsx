import React from "react";

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
  if (leaf.italic) {
    children = <em>{children}</em>; //i'm fairly sure i could have this be an entire <Component/>, as long as there is {children} inside (and only one of them)
  }

  return <span {...attributes}>{children}</span>;
};

export default Leaf;