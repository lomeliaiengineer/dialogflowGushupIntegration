const dialogflow = require('@google-cloud/dialogflow');

async function detectIntent(projectId, utterance, session) {
    const sessionId = session;
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: utterance,
                languageCode: 'en',
            },
        },
    };

    try {
        const responses = await sessionClient.detectIntent(request);
        console.log('Detected intent');
        let response = [];
        const result = responses[0].queryResult;
        console.log(`DF:`, result.fulfillmentMessages);
        if(result.fulfillmentMessages){
            messages = result.fulfillmentMessages;
            messages.forEach(msg => {
                console.log(msg.text);
                response = [...response, msg.text.text[0]];
            });
        }else{
            response = result.fulfillmentText;
        }
        if (result.intent) {
            console.log(`Intent: ${result.intent.displayName}`);
            console.log(`respuesta`, response)
            return response;
        } else {
            console.log(`No intent matched.`);
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = { detectIntent }