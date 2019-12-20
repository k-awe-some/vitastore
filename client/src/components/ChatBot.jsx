import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, Input } from "@material-ui/core";

import Message from "./Message";

const useStyles = makeStyles({
  botContainer: {
    padding: "0 2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%"
  },
  inputMessage: {
    marginBottom: "2rem"
  }
});

const ChatBot = () => {
  let messagesTail = useRef();
  const classes = useStyles();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    df_text_query("hello");
    // df_event_query("Welcome");
  }, []);

  const df_text_query = async text => {
    try {
      const saysMe = {
        speaks: "me",
        msg: {
          text: {
            text: text
          }
        }
      };

      setMessages(messages => [...messages, saysMe]);

      const res = await axios.post(
        "https://vitastore-server.herokuapp.com/api/df_text_query",
        { text }
      );

      for (let msg of res.data[0].queryResult.fulfillmentMessages) {
        const saysBot = {
          speaks: "bot",
          msg: msg
        };

        setMessages(messages => [...messages, saysBot]);
      }
      messagesTail.current.scrollIntoView();
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

  const handleInputKeyPress = event => {
    if (event.keyCode || (event.which === 13 && event.target.value)) {
      df_text_query(event.target.value);
      event.target.value = "";
    }
  };

  return (
    <div className={classes.botContainer}>
      {messages && renderMessages(messages)}

      <div ref={messagesTail} className={classes.inputMessage}>
        <Input
          placeholder="Type your message here"
          fullWidth
          onKeyPress={handleInputKeyPress}
        />
      </div>
    </div>
  );
};

export default ChatBot;
