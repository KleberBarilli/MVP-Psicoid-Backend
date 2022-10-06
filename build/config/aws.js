"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.awsConfig = void 0;
const awsConfig = {
  apiVersion: "2010-12-01",
  acessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
};
exports.awsConfig = awsConfig;