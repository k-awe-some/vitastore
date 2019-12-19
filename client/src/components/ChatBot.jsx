import React, { useState } from "react";
import axios from "axios/index";
import { makeStyles } from "@material-ui/core/styles";
import { Input } from "@material-ui/core";

const useStyles = makeStyles({
  botContainer: {
    padding: "0 2rem",
    display: "flex",
    flexDirection: "column"
  }
});

const ChatBot = () => {
  const classes = useStyles();

  const [state, setState] = useState({
    messages: []
  });

  const df_text_query = async text => {
    let says = {
      speaks: "me",
      msg: {
        text: { text }
      }
    };

    setState({ messages: [...state.messages, says] });
    const res = await axios.post("/api/df_text_query", { text });

    for (let msg of res.data.fulfillmentMessages) {
      says = {
        speaks: "bot",
        msg: msg
      };

      setState({ messages: [...state.messages, says] });
    }
  };

  const df_event_query = async event => {
    const res = await axios.post("/api/df_event_query", { event });

    for (let msg of res.data.fulfillmentMessages) {
      let says = {
        speaks: "me",
        msg: msg
      };

      setState({ messages: [...state.messages, says] });
    }
  };

  return (
    <div className={classes.botContainer}>
      <Input placeholder="Type your message here" fullWidth />
    </div>
  );
};

export default ChatBot;
