import { NextFunction, Response } from 'express'

interface IReqUser {
	user: {
		id: string
		profile: string
	}
}

export const handleRole =
	(...roles: string[]) =>
	({ user }: IReqUser, res: Response, next: NextFunction) => {
		if (roles.includes(user.profile.toUpperCase()) || user.profile === 'ADMIN') {
			next()
		} else {
			return res
				.status(403)
				.send({ message: `Permissão negada para usuário tipo '${user.profile}'` })
		}
	}
