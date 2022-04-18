process.env['GOOGLE_APPLICATION_CREDENTIALS'] = 'helpers/df-service-account.json';
const { detectIntent } = require('./helpers/dialogflow');
//PROJECT_ID
const projectId = 'COPIA_TU_PROJECT_ID_AQUI';

async function MessageHandler(context, event) {
    const response = await detectIntent(projectId, event.message, event.sender);
    context.sendResponse(response);

}

function EventHandler(context, event) {
    //MENSAJE DE BIENVENIDA
    const response = `COLOCA_TU_MENSAJE_DE_BIENVENIDA_AQUI`;
    context.sendResponse(response);
}

function HttpResponseHandler(context, event) {
    if (event.geturl === "http://ip-api.com/json")
        context.sendResponse('This is response from http \n' + JSON.stringify(event.getresp, null, '\t'));
}

function DbGetHandler(context, event) {
    context.sendResponse("testdbput keyword was last sent by:" + JSON.stringify(event.dbval));
}

function DbPutHandler(context, event) {
    context.sendResponse("testdbput keyword was last sent by:" + JSON.stringify(event.dbval));
}

function HttpEndpointHandler(context, event) {
    context.sendResponse('This is response from http \n' + JSON.stringify(event, null, '\t'));
}

function LocationHandler(context, event) {
    context.sendResponse("Got location");
}

exports.onMessage      = MessageHandler;
exports.onEvent        = EventHandler;
exports.onHttpResponse = HttpResponseHandler;
exports.onDbGet        = DbGetHandler;
exports.onDbPut        = DbPutHandler;
if (typeof LocationHandler == 'function') {
    exports.onLocation = LocationHandler;
}
if (typeof HttpEndpointHandler == 'function') {
    exports.onHttpEndpoint = HttpEndpointHandler;
}
