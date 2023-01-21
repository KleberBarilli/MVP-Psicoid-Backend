/* eslint-disable no-console */
import { injectable, inject } from "tsyringe";
import { IPsychologistsRepository } from "../domain/repositories/IPsychologistsRepository";
import { IGetPsicos, IPsychologist } from "../domain/models/IPsychologist";
import { IPagination } from "@shared/infra/http/middlewares/pagination";
import { getKmDistance } from "@shared/lib/distance";
import { IReview } from "@shared/interfaces/IReview";
import { arrAvg } from "@shared/utils/etc";
import { RedisKeys } from "@shared/utils/enums";
import { IRedisCache } from "@shared/cache/IRedisCache";
interface ISaveToCache {
	profileId: string;
	search: any;
	count: number;
	psychologists: IPsychologist[];
}

interface IRecoverFromCache {
	profileId: string;
	search: any;
}

interface IHandlePsicoMapping {
	psychologists: IPsychologist[];
	latitude: number;
	longitude: number;
}

interface IFindPsicos {
	profileId: string;
	pagination: IPagination;
	latitude: number;
	longitude: number;
}

interface IPsicoResponse {
	psychologists: any;
	count: number;
}

@injectable()
export class ListPsychologistsService {
	constructor(
		@inject("PsychologistsRepository")
		private psychologistsRepository: IPsychologistsRepository,
		@inject("RedisCache") private redisCache: IRedisCache,
	) {}

	private async saveToCache({
		profileId,
		search,
		count,
		psychologists,
	}: ISaveToCache) {
		return this.redisCache.save(
			`${RedisKeys.LIST_PSICO}:${JSON.stringify(search)}:${profileId}`,
			[count, psychologists],
		);
	}

	private async recoverFromCache({ profileId, search }: IRecoverFromCache) {
		return this.redisCache.recover<any>(
			`${RedisKeys.LIST_PSICO}:${JSON.stringify(search)}:${profileId}`,
		);
	}

	private async handlePsicoMapping({
		psychologists,
		latitude,
		longitude,
	}: IHandlePsicoMapping) {
		let ratings: number[] = [];
		const psicos = psychologists.map((psico: IPsychologist) => {
			psico.distance = getKmDistance(
				{ latitude, longitude },
				{
					latitude: psico.office.address.latitude || 0,
					longitude: psico.office.address.longitude || 0,
				},
			);

			psico.reviews.map((review: IReview) => {
				ratings.push(review.rating);
			});

			psico.avgRating = Math.round(arrAvg(ratings));

			return psico;
		});

		return psicos;
	}

	private async findPsicos({
		profileId,
		pagination,
		latitude,
		longitude,
	}: IFindPsicos): Promise<IPsicoResponse> {
		const [count, psychologists] =
			await this.psychologistsRepository.findAll(pagination);

		await this.saveToCache({
			profileId,
			search: pagination.search,
			count,
			psychologists,
		});

		const psicoMapping = await this.handlePsicoMapping({
			psychologists,
			latitude,
			longitude,
		});

		return { psychologists: psicoMapping, count };
	}

	public async execute({
		profileId,
		pagination,
	}: IGetPsicos): Promise<IPsicoResponse> {
		const { latitude, longitude } = pagination;

		const cachedPsicos = await this.recoverFromCache({
			profileId,
			search: pagination.search,
		});

		let count;
		let psychologists;

		if (cachedPsicos) {
			count = cachedPsicos[0];
			psychologists = cachedPsicos[1];
			return { count, psychologists };
		}

		return this.findPsicos({ profileId, pagination, latitude, longitude });
	}
}
