import React from "react";
 
// the default element if no other is specified. 

const DefaultElement = (props) => {
  const { attributes, children } = props;
  return <div {...attributes}>{children}</div>;
};

export default DefaultElement;