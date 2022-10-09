import AWS from "aws-sdk";
import { awsConfig } from "@config/aws";

const AWS_SES = new AWS.SES(awsConfig);

interface ISendMail {
	recipients: string[];
	from?: string;
	html: string;
	subject: string;
}

export const sendEmail = ({ from, recipients, subject, html }: ISendMail) => {
	let params = {
		Source: from || "psicoid-contato@psicoid.com.br",
		Destination: {
			BccAddresses: recipients,
		},
		ReplyToAddresses: [],
		Message: {
			Body: {
				Html: {
					Charset: "UTF-8",
					Data: html,
				},
			},
			Subject: {
				Charset: "UTF-8",
				Data: subject,
			},
		},
	};
	return AWS_SES.sendEmail(params).promise();
};
