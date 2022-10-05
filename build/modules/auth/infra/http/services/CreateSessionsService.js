"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true,
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("../../../../../config/auth"));

var _IHashProvider = require("../../../providers/HashProvider/models/IHashProvider");

var _client = require("@prisma/client");

var _dec, _dec2, _dec3, _dec4, _class, _prisma;

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _classpublicFieldLooseBase(receiver, publicKey) {
	if (!Object.prototype.hasOwnProperty.call(receiver, publicKey)) {
		throw new TypeError("attempted to use public field on non-instance");
	}
	return receiver;
}

var id = 0;

function _classpublicFieldLooseKey(name) {
	return "__public_" + id++ + "_" + name;
}

let CreateSessionsService =
	((_dec = (0, _tsyringe.injectable)()),
	(_dec2 = function (target, key) {
		return (0, _tsyringe.inject)("HashProvider")(target, undefined, 0);
	}),
	(_dec3 = Reflect.metadata("design:type", Function)),
	(_dec4 = Reflect.metadata("design:paramtypes", [
		typeof _IHashProvider.IHashProvider === "undefined" ? Object : _IHashProvider.IHashProvider,
	])),
	_dec(
		(_class =
			_dec2(
				(_class =
					_dec3(
						(_class =
							_dec4(
								(_class =
									((_prisma = /*#__PURE__*/ _classpublicFieldLooseKey("prisma")),
									class CreateSessionsService {
										constructor(hashProvider) {
											this.hashProvider = hashProvider;
											Object.defineProperty(this, _prisma, {
												writable: true,
												value: void 0,
											});
											_classpublicFieldLooseBase(this, _prisma)[_prisma] =
												new _client.PrismaClient();
										}

										async execute({ email, password }) {
											const user = await _classpublicFieldLooseBase(
												this,
												_prisma,
											)[_prisma].credential.findUnique({
												where: {
													email,
												},
											});

											if (!user) {
												throw new _AppError.default(
													"Incorrect email/password combination.",
													401,
												);
											}

											const passwordConfirmed =
												await this.hashProvider.compareHash(
													password || "",
													user.password,
												);

											if (!passwordConfirmed) {
												throw new _AppError.default(
													"Incorrect email/password combination.",
													401,
												);
											}

											const token = (0, _jsonwebtoken.sign)(
												{},
												_auth.default.jwt.secret,
												{
													subject: user.id,
													expiresIn: _auth.default.jwt.expiresIn,
												},
											);
											return {
												user,
												token,
											};
										}
									})),
							) || _class),
					) || _class),
			) || _class),
	) || _class);
var _default = CreateSessionsService;
exports.default = _default;
