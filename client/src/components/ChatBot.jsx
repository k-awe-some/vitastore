import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, Input } from "@material-ui/core";

import Message from "./Message";

const useStyles = makeStyles({
  botContainer: {
    padding: "0 2rem",
    display: "flex",
    flexDirection: "column",
    height: "100%"
  }
});

const ChatBot = () => {
  const classes = useStyles();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("I was called");
    df_text_query("hello");
    // df_event_query("Welcome");
  }, []);

  const df_text_query = async text => {
    try {
      let says = {
        speaks: "me",
        msg: {
          text: { text }
        }
      };

      setMessages([...messages, says]);

      const res = await axios.post("/api/df_text_query", { text });
      console.log("in df_text_query", res);

      for (let msg of res.data[0].queryResult.fulfillmentMessages) {
        says = {
          speaks: "bot",
          msg: msg
        };

        setMessages([...messages, says]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const df_event_query = async event => {
  //   try {
  //     const res = await axios.post("/api/df_event_query", event);
  //     console.log("in df_text_query", res);
  //
  //     for (let msg of res.data.fulfillmentMessages) {
  //       let says = {
  //         speaks: "me",
  //         msg: msg
  //       };
  //
  //       setMessages([...messages, says]);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const renderMessages = messages => {
    console.log(messages);
    return (
      <List>
        {messages.map((msg, i) => (
          <ListItem key={i}>
            <Message speaks={msg.speaks} text={msg.msg.text.text} />
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <div className={classes.botContainer}>
      {messages && renderMessages(messages)}
      <Input placeholder="Type your message here" fullWidth />
    </div>
  );
};

export default ChatBot;
