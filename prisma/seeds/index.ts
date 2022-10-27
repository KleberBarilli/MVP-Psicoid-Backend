import { approachesSeeder } from './therapeutic_approaches'

async function seeds() {
	await approachesSeeder()
}

seeds()
