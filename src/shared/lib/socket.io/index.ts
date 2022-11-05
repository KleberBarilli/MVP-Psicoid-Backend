import io from 'socket.io-client'
import config from '@config/index'

export const emitEvent = (event: any, payload: any) => {
	const socket = io(config.SOCKET_URI)
	socket.on('connect_error', err => {
		console.log('connect_error', err.message, err.name)
	})
	socket.on('connect', () => {
		console.log(`Socket connected: ${socket.id}`)
		socket.emit(event, payload)
		socket.disconnect()
	})
}
