const functions = require('firebase-functions');
const server = require('./server');

exports.next = functions
	.runWith({ timeoutSeconds: 540 })
	.https.onRequest(server);
