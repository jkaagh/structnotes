import React, { useState } from "react";

const AccordionElement = ({ attributes, children }) => {

    const [closed, setClosed] = useState(false); //todo eventually fetch starting position from savefile
    const [heightClass, setHeightClass] = useState('');
  
    const handleToggle = () => {
      if (closed === false) {
        setHeightClass('h-0');
      } else {
        setHeightClass('');
      }
  
      setClosed(!closed);
    };

    
    return (
        <div {...attributes} className="ml-3 pl-2 border-l border-slate-700">

          {children}
        </div>
    );
};



export default AccordionElement;