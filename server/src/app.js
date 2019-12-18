const express = require("express");
const bodyParser = require("body-parser");
const app = express();

require("./routes/dialogflowRoutes")(app);

app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`🚀 Server is running on http://localhost:${port}`)
);
