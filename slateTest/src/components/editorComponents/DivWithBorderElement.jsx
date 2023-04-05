import React from "react";

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

export default DivWithBorderElement;