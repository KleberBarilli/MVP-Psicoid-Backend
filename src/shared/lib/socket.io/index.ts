import { io } from "socket.io-client";
import config from "@config/index";

export const createSocket = (event: any, payload: any) => {
	const socket = io(config.SOCKET_URI);
	socket.on("connect_error", err => {
		console.log("connect_error", err);
	});
	socket.on("connect", () => {
		console.log(`Socket connected: ${socket.id}`);
		socket.emit(event, payload);
		socket.disconnect();
	});
};
