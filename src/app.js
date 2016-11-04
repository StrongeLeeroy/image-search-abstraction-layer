import express from 'express';
import mongoose from 'mongoose';
import { searchApi } from './api/search';

const mongodb = process.env.MONGODB_URI || 'mongodb://localhost:27017';
mongooseInit(mongodb);

/* ExpressJS app logic */
export const app = express();

app.use('/api', searchApi);


/* Mongoose initialization */
function mongooseInit(mongodb) {
	mongoose.Promise = global.Promise;
	mongoose.connect(mongodb);
	var db = mongoose.connection;
	db.on('open', () => {
		console.log(`[OK] Connection to ${mongodb} is now open.`);
	});
	db.on('error', error => {
		console.log(`[ERROR] Database error: ${error}`);
	});
}