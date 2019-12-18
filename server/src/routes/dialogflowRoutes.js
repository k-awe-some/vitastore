const dialogflow = require("dialogflow");
const bodyParser = require("body-parser");

const CONFIG = require("../config/keys.js");

const sessionClient = new dialogflow.SessionsClient();

const sessionPath = sessionClient.sessionPath(
  CONFIG.GOOGLE_PROJECT_ID,
  CONFIG.DIALOGFLOW_SESSION_ID
);

module.exports = app => {
  app.use(bodyParser.json());

  app.get("/", (req, res) => {
    res.status(200).send({
      hello: "there"
    });
  });

  app.post("/api/df_text_query", async (req, res) => {
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: req.body.text,
          languageCode: CONFIG.DIALOGFLOW_SESSION_LANGUAGE_CODE
        }
      }
    };

    const responses = await sessionClient.detectIntent(request);
    console.log("Detected intent");

    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);

    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);
    }

    res.status(200).send(result);
  });

  app.post("/api/df_event_query", (req, res) => {
    res.status(200).send({ do: "event query" });
  });
};
