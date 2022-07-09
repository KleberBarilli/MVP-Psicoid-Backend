import mongoose from 'mongoose';
import AppError from '../../errors/AppError';

export default function connectToDatabase() {
	mongoose.connect(process.env.MONGODB_URI || '');
}

const db = mongoose.connection;
db.once('open', () => console.log('Connected to database'));
db.on('error', () => {
	throw new AppError('Error connecting to database');
});
