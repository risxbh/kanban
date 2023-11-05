import React, { useState } from "react";
import "../App.css";

function NavBar({
  onGroupingChange,
  onOrderingChange,
  selectedGrouping,
  selectedOrdering,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleGroupingChange = (e) => {
    onGroupingChange(e.target.value);
    togglePopup();
  };

  const handleOrderingChange = (e) => {
    onOrderingChange(e.target.value);
    togglePopup();
  };

  return (
    <nav className="popup-dropdown">
      <button onClick={togglePopup}>
        <img src={require("../img/filter.png")} alt="" />
        Display
        <img src={require("../img/down-arrow.png")} alt="" />
      </button>
      {isOpen && (
        <div className="dropdown">
          <div className="label-dropdown">
            <span>Grouping</span>
            <select
              value={selectedGrouping}
              onChange={handleGroupingChange}
              className="dropdown-menu"
            >
              <option value="Status">Status</option>
              <option value="User">User</option>
              <option value="Priority">Priority</option>
            </select>
          </div>
          <div className="label-dropdown">
            <span>Ordering</span>
            <select
              value={selectedOrdering}
              onChange={handleOrderingChange}
              className="dropdown-menu"
            >
              <option value="Priority">Priority</option>
              <option value="Title">Title</option>
            </select>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
