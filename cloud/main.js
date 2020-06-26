require('./functions.js')

Parse.Promise.enableAPlusCompliant()
/*
* If you want to use Advanced Cloud Code,
* exporting of module.exports.app is required.
* We mount it automaticaly to the Parse Server Deployment.
* If you don't want to use it just comment module.exports.app
*∆
*
*/
module.exports.app = require('./app')

console.info("Server running at Version 1.328")

