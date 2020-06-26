var path = require('path');
var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;


databaseUri || console.log('DATABASE_URI not specified, falling back to localhost.');

let conf = {}

try {
    conf = require("./conf/conf")

} catch (e) {
    "could not load conf"

}


var port = process.env.PORT || 1337;
var api = new ParseServer(
    {
        databaseURI: databaseUri || 'mongodb://localhost:27017/' + conf.db + '?keepAlive=true&poolSize=30&autoReconnect=true&socketTimeoutMS=360000&connectTimeoutMS=360000',
        appId: process.env.APP_ID || 'myAppId',
        masterKey: process.env.MASTER_KEY || 'masterKey', //Add your master key here. Keep it secret!
        serverURL: process.env.SERVER_URL || 'http://0.0.0.0:' + port + '/1',


        // If you change the cloud/main.js to another path
        // it wouldn't work on SashiDo :( ... so Don't change this.
        cloud: process.env.CLOUD_CODE_MAIN || 'cloud/main.js',

  liveQuery:
  {
    classNames: [
    ] // List of
    // classes to
    // support for query
    // subscriptions
    // example: [
    // 'Posts',
    // 'Comments' ]
  },
});

// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

process.env.CLIENT_TOKEN_CONTACTS = process.env.CLIENT_TOKEN_CONTACTS || conf.CLIENT_TOKEN_CONTACTS || '{"access_token":"ya29.GlvKBrWdzVwKPrvPmHuYUcrKTXGpzLLw8NK2REnyh839-AUpD0qGh71M1zvMNg2kgS42H5_MYdXSjix3e0mUtk4z_2BsQ4ayEiJg-QE96BqXu1Zd6z0YeM4NN-vX","refresh_token":"1/5DUGQShT1Xe_uUc4Vqg8pETY8yU2ExrkDRp7fbyBFzf2gOW-hitTcbVcaT-SSAEM","scope":"https://www.googleapis.com/auth/contacts","token_type":"Bearer","expiry_date":1552392993347}'
process.env.APP_TOKEN = process.env.APP_TOKEN || conf.APP_TOKEN || '{"installed":{"client_id":"234139906119-85u6dm1sm70g41m6feijq5ejfqds4sv5.apps.googleusercontent.com","project_id":"fadash","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"0rYKuVCzSd0elcmElGiDna6k","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}}'
process.env.AUTOMATIC_MAIL_TOKEN = process.env.AUTOMATIC_MAIL_TOKEN || conf.AUTOMATIC_MAIL_TOKEN || '{"access_token":"ya29.GlveBpICoCX10KyFJGWIpGY5tVsGsXTbebYAUz6Q9IvqNUwahCHXPoWMwc7lesoL2uZd7pN0TY-Xrfl5BK9hnVOCbdsNds8IEcM9fKXkPaU58e4YCq6CoH2QSyew","refresh_token":"1/S4Bc9mFn21wBZQySOZeqxgwsh0bjEm3xJ6dHds_o7zE","scope":"https://www.googleapis.com/auth/gmail.modify","token_type":"Bearer","expiry_date":1554119363684}'
process.env.CREDIT_SAFE_CREDENTIALS = process.env.CREDIT_SAFE_CREDENTIALS || conf.CREDIT_SAFE_CREDENTIALS || '{ "username" : "walzel@facturee.de" , "password" : "cBM812M$5-$()6n#6_8-7*"  }'
process.env.VAT_VALIDATOR_KEY = process.env.VAT_VALIDATOR_KEY || conf.VAT_VALIDATOR_KEY || 'e70af1b5ce7f49c290f561a811dfda20'
process.env.EXTERNAL_URL_BASE = process.env.EXTERNAL_URL_BASE || conf.EXTERNAL_URL_BASE + port || 'http://0.0.0.0:' + port
process.env.SEND_OFFER_MAIL_DAYS_AGO = process.env.SEND_OFFER_MAIL_DAYS_AGO || conf.SEND_OFFER_MAIL_DAYS_AGO || 0
process.env.PATCH_DISTRIBUTION = process.env.PATCH_DISTRIBUTION || conf.PATCH_DISTRIBUTION || "no"

var app = express();

// Serve static assets from the /public folder
app.use(express.static(path.join(__dirname, '/public')));


// Mount your cloud express app
app.use('/', require('./cloud/main.js').app);


// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/1';
app.use(mountPath, api);


var httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
    console.log('Running on http://localhost:' + port);
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);

