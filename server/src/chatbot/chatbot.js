const dialogflow = require("dialogflow");

const structjson = require("./structjson.js");
const config = require("../config/keys.js");

const projectId = config.GOOGLE_PROJECT_ID;
const dialogflowSessionId = config.DIALOGFLOW_SESSION_ID;

const credentials = {
  client_email: config.GOOGLE_CLIENT_EMAIL,
  private_key: config.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n")
};

const sessionClient = new dialogflow.SessionsClient({
  projectId,
  credentials
});

const sessionPath = sessionClient.sessionPath(projectId, dialogflowSessionId);

module.exports = {
  textQuery: async (text, parameters = {}) => {
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: text,
          languageCode: config.DIALOGFLOW_SESSION_LANGUAGE_CODE
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

  eventQuery: async (event, parameters = {}) => {
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          name: event,
          parameters: structjson.jsonToStructProto(parameters),
          languageCode: config.DIALOGFLOW_SESSION_LANGUAGE_CODE
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
