const express = require("express");

const app = express();

require("./routes/dialogflowRoutes")(app);

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`🚀 Server is running on http://localhost:${port}`)
);
