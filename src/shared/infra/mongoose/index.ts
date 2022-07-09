import mongoose from 'mongoose';
import AppError from '../../errors/AppError';

export default function connectToDatabase() {
	mongoose.connect(
		'mongodb+srv://DI-Tech:fPRzgywD7byLn9bQ@digital-inspires-sa-eas.rhv3i.mongodb.net/psicoID_local',
	);
}

const db = mongoose.connection;
db.once('open', () => console.log('Connected to database'));
db.on('error', () => {
	throw new AppError('Error connecting to database');
});
