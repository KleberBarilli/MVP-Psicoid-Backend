import { SNS } from "aws-sdk";

interface ISendSMS {
	Message: string;
	PhoneNumber: string;
}

export const sendSMS = (params: ISendSMS) => {
	return new SNS({ apiVersion: "2010-03-31" }).publish(params).promise();
};
