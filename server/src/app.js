const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.options("*", cors());

require("./routes/dialogflowRoutes")(app);

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`🚀 Server is running on http://localhost:${port}`)
);
