import prisma from "@shared/prisma";
export default class NotificationsRepository {
	#prisma;
	constructor() {
		this.#prisma = prisma;
	}
}
