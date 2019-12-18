const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).send({
    hello: "there"
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`🚀 Server is running on http://localhost:${port}`)
);
