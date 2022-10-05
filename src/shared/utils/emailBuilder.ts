import AWS from "aws-sdk";
import { awsConfig } from "@config/aws";

const AWS_SES = new AWS.SES(awsConfig);

export const sendEmail = (recipientEmail: any, message?: string, source?: string) => {
	let params = {
		Source: source || "psicoid-contato@psicoid.com.br",
		Destination: {
			BccAddresses: [recipientEmail],
		},
		ReplyToAddresses: [],
		Message: {
			Body: {
				Html: {
					Charset: "UTF-8",
					Data: `<p> Redefina a sua senha utilizando esse código ${message} </p>`,
				},
			},
			Subject: {
				Charset: "UTF-8",
				Data: `Hello`,
			},
		},
	};
	return AWS_SES.sendEmail(params).promise();
};
