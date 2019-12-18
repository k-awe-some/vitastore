const bodyParser = require("body-parser");

const chatbot = require("../chatbot/chatbot");

module.exports = app => {
  app.use(bodyParser.json());

  app.get("/", (req, res) => {
    res.status(200).send({
      hello: "there"
    });
  });

  app.post("/api/df_text_query", async (req, res) => {
    const responses = await chatbot.textQuery(
      req.body.text,
      req.body.parameters
    );
    res.status(200).send(responses);
  });

  app.post("/api/df_event_query", (req, res) => {
    res.status(200).send({ do: "event query" });
  });
};
