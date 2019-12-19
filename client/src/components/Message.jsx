import React from "react";

const Message = ({ speaks, text }) => {
  return (
    <div>
      {speaks === "bot" && (
        <div style={{ color: "red" }}>
          <div>{speaks}</div>
        </div>
      )}

      {speaks === "me" && (
        <div style={{ color: "blue" }}>
          <div>{speaks}</div>
        </div>
      )}

      <div>
        <span>{text}</span>
      </div>
    </div>
  );
};

export default Message;
