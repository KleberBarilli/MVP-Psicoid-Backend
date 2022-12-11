export interface IRedisCache {
	save(key: string, value: any): Promise<void>;
	recover<T>(key: string): Promise<T | null>;
	invalidate(key: string): Promise<void>;
	invalidateKeysByPattern(keyPattern: string): Promise<void>;
}
