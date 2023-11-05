import "./App.css";
import React, { useState } from "react";
import NavBar from "./component/navBar";
import BodyScreen from "./component/body-screen";

function App() {
  const [selectedGrouping, setSelectedGrouping] = useState("Status");
  const [selectedOrdering, setSelectedOrdering] = useState("Priority");

  const handleGroupingChange = (value) => {
    setSelectedGrouping(value);
  };

  const handleOrderingChange = (value) => {
    setSelectedOrdering(value);
  };

  return (
    <div>
      <NavBar
        selectedGrouping={selectedGrouping}
        onGroupingChange={handleGroupingChange}
        selectedOrdering={selectedOrdering}
        onOrderingChange={handleOrderingChange}
      />
      <BodyScreen
        selectedGrouping={selectedGrouping}
        selectedOrdering={selectedOrdering}
      />
    </div>
  );
}

export default App;
