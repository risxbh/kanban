import React, { useEffect, useState } from "react";
import "../App.css";

function Card({ title, id, name, status, priority, tag, groupby, available }) {
  const [showStatus, setShowStatus] = useState("block");
  const [showPriority, setShowPriority] = useState("flex");
  const [showUser, setShowUser] = useState("block");
  const [availableStatus, setAvailableStatus] = useState("block");
  const statusImages = {
    Todo: require("../img/todo.png"),
    "In progress": require("../img/progress.png"),
    Backlog: require("../img/backlog.png"),
    Done: require("../img/done.png"),
    Cancelled: require("../img/cancel.png"),
  };
  const priorityImages = {
    0: require("../img/noPriority.png"),
    1: require("../img/low.png"),
    2: require("../img/medium.png"),
    3: require("../img/high.png"),
    4: require("../img/urgent.png"),
  };
  const statusImage = statusImages[status] || require("../img/todo.png");
  const priorityImage =
    priorityImages[priority] || require("../img/noPriority.png");

  useEffect(() => {
    if (groupby === "Status") {
      setShowStatus("none");
    } else if (groupby === "Priority") {
      setShowPriority("flex");
    } else if (groupby === "User") {
      setShowUser("none");
    }
  }, [groupby]);

  useEffect(() => {
    if (available === true) {
      setAvailableStatus("#21B353");
    }
  }, [available]);

  return (
    <div className="card">
      <div className="card-header">
        <p>{id}</p>
        <div className="profile-con" style={{ display: showUser }}>
          <img src={require("../img/user.png")} alt="" />
          <div className="status" style={{ background: availableStatus }}></div>
        </div>
      </div>
      <div className="card-body">
        <img src={statusImage} style={{ display: showStatus }} alt="" />
        <p>{title}</p>
      </div>

      <div className="card-footer">
        <div className="grey-con" style={{ display: showPriority }}>
          <img src={priorityImage} alt="" />
        </div>
        <div className="grey-con" style={{ padding: "7px 8px" }}>
          <div className="grey-round"></div>
          <p>{tag}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;

// const style = {};
