'use strict';
var AWS = require('aws-sdk');
var moment = require('moment');


exports.sqsConsumer = async (event, context) => {
	const sqsConsumerProcessedMessages = [];
	try{

		console.log('--Start---');
		const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

		event.Records.forEach(sqsMessage => {
			console.log(sqsMessage);

			sqsConsumerProcessedMessages.push({
				message: sqsMessage,
				time: new Date().getTime(),
				lambdaRandomId: Math.random()*100 + ''
			});

		});

		console.log("Processed by this Lambda -> ", sqsConsumerProcessedMessages);
		console.log('--END---');

	} catch(err) {
		console.log("Error whicle procesing -> ", err.message);
		console.log("Processed Failed by this Lambda -> ", sqsConsumerProcessedMessages);
		console.log('--END---');
	}
};
