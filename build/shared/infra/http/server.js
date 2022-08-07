"use strict";

require("reflect-metadata");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

require("express-async-errors");

var _morgan = _interopRequireDefault(require("morgan"));

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _routes = _interopRequireDefault(require("./routes"));

require("../../container");

var _AppError = _interopRequireDefault(require("../../errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use((0, _morgan.default)('dev'));
app.use(_express.default.json());
app.use((0, _cors.default)());
app.use(_routes.default);
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Psico ID APi',
      version: '1.0.0'
    }
  },
  apis: ['server.ts']
};
const swaggerDocs = (0, _swaggerJsdoc.default)(swaggerOptions);
/**
 * @swagger
 * /clients:
 * 	post:
 *   description:Create a new client
 *   responses:
 *    201:
 * 	description: Success
 */

app.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(swaggerDocs));
app.use((error, req, res, next) => {
  if (error instanceof _AppError.default) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  return res.status(500).json({
    status: 'error',
    message: error.message
  });
});
app.listen(process.env.PORT, () => {
  console.log(`Rodando na porta ${process.env.PORT}`);
});