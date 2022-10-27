import haversine from 'haversine-distance'

interface IPoint {
	latitude: number
	longitude: number
}

export const getKmDistance = (point1: IPoint, point2: IPoint): number => {
	return haversine(point1, point2) / 1000
}
