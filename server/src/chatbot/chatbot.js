const dialogflow = require("dialogflow");

const CONFIG = require("../config/keys.js");

const sessionClient = new dialogflow.SessionsClient();

const sessionPath = sessionClient.sessionPath(
  CONFIG.GOOGLE_PROJECT_ID,
  CONFIG.DIALOGFLOW_SESSION_ID
);

module.exports = {
  textQuery: async (text, parameters = {}) => {
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: text,
          languageCode: CONFIG.DIALOGFLOW_SESSION_LANGUAGE_CODE
        }
      },
      queryParams: {
        payload: {
          data: parameters
        }
      }
    };

    let responses = await sessionClient.detectIntent(request);
    console.log("Detected intent");

    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);

    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);
    }

    responses = await self.handleAction(responses);
    return responses;
  },

  handleAction: responses => responses
};
