"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true,
});
exports.default = void 0;

var _client = require("@prisma/client");

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

var _prisma = /*#__PURE__*/ _classpublicFieldLooseKey("prisma");

class ClientsRepository {
	constructor() {
		Object.defineProperty(this, _prisma, {
			writable: true,
			value: void 0,
		});
		_classpublicFieldLooseBase(this, _prisma)[_prisma] = new _client.PrismaClient();
	}

	async create({ credential, identity, contact, address }) {
		//console.log(address);
		return _classpublicFieldLooseBase(this, _prisma)[_prisma].client.create({
			data: {
				credential: {
					create: { ...credential },
				},
				identity: {
					create: {
						...identity,
						contact: {
							create: { ...contact },
						},
						address: {
							create: { ...address },
						},
					},
				},
			},
		});
	}

	async findById(id) {
		return await _classpublicFieldLooseBase(this, _prisma)[_prisma].client.findUnique({
			where: {
				id,
			},
		});
	}

	async findByEmail(email) {
		return await _classpublicFieldLooseBase(this, _prisma)[_prisma].credential.findUnique({
			where: {
				email,
			},
		});
	}
}

exports.default = ClientsRepository;
