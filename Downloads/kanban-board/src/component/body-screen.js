import React, { useEffect, useState } from "react";
import Card from "./card";

function BodyScreen({ selectedGrouping, selectedOrdering }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const topImages = {
    Todo: require("../img/todo.png"),
    "In progress": require("../img/progress.png"),
    Backlog: require("../img/backlog.png"),
    Done: require("../img/done.png"),
    Cancelled: require("../img/cancel.png"),
    0: require("../img/noPriority.png"),
    1: require("../img/low.png"),
    2: require("../img/medium.png"),
    3: require("../img/high.png"),
    4: require("../img/urgent.png"),
  };

  const priorityName = {
    0: "No Priority",
    1: "Low",
    2: "Medium",
    3: "High",
    4: "Urgent",
  };

  useEffect(() => {
    // API Call
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLoading(false);
      });
  }, []);

  const groupAndSortData = (tickets, grouping, ordering) => {
    if (!tickets || !Array.isArray(tickets) || tickets.length === 0) {
      return {};
    }

    let groupedData = {};

    if (grouping === "Status") {
      // Group by status
      groupedData = tickets.reduce((result, ticket) => {
        (result[ticket.status] = result[ticket.status] || []).push(ticket);
        return result;
      }, {});
    } else if (grouping === "User") {
      // Group by user
      groupedData = tickets.reduce((result, ticket) => {
        const user = data.users.find((u) => u.id === ticket.userId);
        const userName = user ? user.name : "Unknown User";
        (result[userName] = result[userName] || []).push(ticket);
        return result;
      }, {});
    } else if (grouping === "Priority") {
      // Group by priority
      groupedData = tickets.reduce((result, ticket) => {
        (result[ticket.priority] = result[ticket.priority] || []).push(ticket);
        return result;
      }, {});
    }

    if (ordering === "Priority") {
      // Sort by priority (in descending order)
      Object.keys(groupedData).forEach((key) => {
        groupedData[key].sort((a, b) => b.priority - a.priority);
      });
    } else if (ordering === "Title") {
      // Sort by title (in ascending order)
      Object.keys(groupedData).forEach((key) => {
        groupedData[key].sort((a, b) => a.title.localeCompare(b.title));
      });
    }

    return groupedData;
  };

  const groupedAndSortedData = groupAndSortData(
    data.tickets,
    selectedGrouping,
    selectedOrdering
  );

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="body-main">
          {Object.keys(groupedAndSortedData).map((groupKey) => (
            <div key={groupKey} className="body-group">
              <div className="card-heading">
                <div className="heading-start">
                  <img
                    src={topImages[groupKey] || require("../img/user.png")}
                    className="headingImage"
                    alt=""
                  />
                  <h4>{priorityName[groupKey] || groupKey}</h4>
                  <p>{groupedAndSortedData[groupKey].length}</p>
                </div>
                <div className="heading-end">
                  <img src={require("../img/plus.png")} alt="" />
                  <img src={require("../img/dots.png")} alt="" />
                </div>
              </div>

              <div className="card-list">
                {groupedAndSortedData[groupKey].map((ticket) => (
                  <Card
                    key={ticket.id}
                    title={ticket.title}
                    id={ticket.id}
                    name={
                      data.users.find((u) => u.id === ticket.userId)?.name ||
                      "Unknown User"
                    }
                    tag={ticket.tag}
                    status={ticket.status}
                    priority={ticket.priority}
                    groupby={selectedGrouping}
                    available={
                      data.users.find((u) => u.id === ticket.userId)?.available
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BodyScreen;
