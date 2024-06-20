import React, { useState } from "react";
import { Submit } from "./Submit";

function Dropdown({ trigger, items }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (Component) => {
    setSelectedComponent(() => Component);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative flex flex-col">
      <Submit text={trigger} onClick={toggleDropdown} />
      {isOpen && (
        <div className="dropdown-menu border border-red-500 bg-red-200 rounded shadow-md absolute mt-2 z-10">
          {items.map((item, index) => (
            <div
              key={index}
              className="dropdown-item hover:bg-gray-100 px-4 py-2 cursor-pointer"
              onClick={() => handleItemClick(item.componentToRender)}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
      <div className="mt-4">
        {selectedComponent && React.createElement(selectedComponent)}
      </div>
    </div>
  );
}

export { Dropdown };
