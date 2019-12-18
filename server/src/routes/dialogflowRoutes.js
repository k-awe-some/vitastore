module.exports = app => {
  app.get("/", (req, res) => {
    res.status(200).send({
      hello: "there"
    });
  });

  app.post("/api/df_text_query", (req, res) => {
    res.status(200).send({ do: "text query" });
  });

  app.post("/api/df_event_query", (req, res) => {
    res.status(200).send({ do: "event query" });
  });
};
