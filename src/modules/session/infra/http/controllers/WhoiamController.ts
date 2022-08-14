import { Request, Response } from 'express';
import { container } from 'tsyringe';

import WhoiamService from '../services/WhoiamService';

export default class WhoiamController {
	public async show(req: Request, res: Response): Promise<Response> {
		try {
			const whoiam = container.resolve(WhoiamService);
			const user = await whoiam.execute(req.user.id, req.user.profile);
			user.password = null;
			return res.status(200).json({ message: 'User Found', ...user });
		} catch (err: any) {
			return res.status(500).json({ message: err.message });
		}
	}
}
