import React from "react";

const AccordionElement = ({ attributes, children }) => {
  return (
    <div {...attributes} className="ml-3 pl-2 border-l border-slate-700">
        
        <div className="p-2 bg-slate-700">

        </div>
        
        <div>
            {children}
        </div>
    </div>
  );
};

export default AccordionElement;