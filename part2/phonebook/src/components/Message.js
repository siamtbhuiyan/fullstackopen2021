import React from "react";

const Message = ({ message }) => {
  let messageStyle = {};

  if (message !== null) {
    if (message.includes("[error]")) {
      messageStyle = {
        color: "red",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      };
    } else {
      messageStyle = {
        color: "green",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      };
    }
  } else {
    messageStyle = {};
  }

  return <div style={messageStyle}>{message}</div>;
};

export default Message;
