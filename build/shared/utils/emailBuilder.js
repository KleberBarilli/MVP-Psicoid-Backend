"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEmail = void 0;

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _aws = require("@config/aws");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AWS_SES = new _awsSdk.default.SES(_aws.awsConfig);

const sendEmail = (recipientEmail, message, source) => {
  let params = {
    Source: source || "psicoid-contato@psicoid.com.br",
    Destination: {
      BccAddresses: [recipientEmail]
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<p> Redefina a sua senha utilizando esse código ${message} </p>`
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: `Hello`
      }
    }
  };
  return AWS_SES.sendEmail(params).promise();
};

exports.sendEmail = sendEmail;