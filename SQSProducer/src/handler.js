'use strict';
var AWS = require('aws-sdk');
var moment = require('moment');


exports.sqsProducer = async (event, context) => {
	try{
		const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

		const userData = {
			claims: event.requestContext && event.requestContext.authorizer ? event.requestContext.authorizer.claims : ''
		}	
		
		const sqsJobs = JSON.parse(event.body).sqsJobs;
		console.log(sqsJobs, process.env.MufSQSQueUrl);
		
		var params = {
			QueueUrl: process.env.MufSQSQueUrl,
	   		Entries: getMessages(sqsJobs)
		};
		const sqsResult = await sqs.sendMessageBatch(params).promise();


		console.log("moment date ->>> ", moment(new Date()).format('MM/DD/YYYY'));
		var response = { 	
					statusCode: 200, 
					body: JSON.stringify({result: '',  userData: userData, sqsSendResult: sqsResult}),
					headers: {'Access-Control-Allow-Origin': '*'}
		}; 
	} catch(err) {

		response = { 	
			statusCode: 500, 
			body: JSON.stringify({error: err.message}),
			headers: {'Access-Control-Allow-Origin': '*'}
		}; 
	}
	
	
	return response;
};


function getMessages(sqsJobs) {

	return sqsJobs.map(job => {
		return {
			Id: job.id,
			DelaySeconds: 5,
			MessageAttributes: {
			  "Title": {
				DataType: "String",
				StringValue: "title_" + job.id
			  }
			},
			MessageBody: "body_" + job.id
		}
	})

	
}