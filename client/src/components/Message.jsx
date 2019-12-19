import React from "react";

const Message = ({ speaks, text }) => {
  return (
    <div>
      {speaks === "bot" && (
        <div>
          <button>{speaks}</button>
        </div>
      )}

      <div>
        <span>{text}</span>
      </div>

      {speaks === "me" && (
        <div>
          <button>{speaks}</button>
        </div>
      )}
    </div>
  );
};

export default Message;
