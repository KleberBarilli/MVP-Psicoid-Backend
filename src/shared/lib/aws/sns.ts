// Load the AWS SDK for Node.js
import AWS from "aws-sdk";
import { awsConfig } from "../../../config/aws";

// Create publish parameters
let params = {
	Message: "TEXT_MESSAGE NODEJS TEST" /* required */,
	PhoneNumber: "+5554999532382",
};

// Create promise and SNS service object
let publishTextPromise = new AWS.SNS(awsConfig).publish(params).promise();

// Handle promise's fulfilled/rejected states
publishTextPromise
	.then(function (data) {
		console.log("MessageID is " + data.MessageId);
	})
	.catch(function (err) {
		console.error(err, err.stack);
	});

export default publishTextPromise;
