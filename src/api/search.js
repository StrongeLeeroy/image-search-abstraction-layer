import express from 'express';
import Search from 'bing.search';
import { SearchHistory } from '../models/searchHistory';

const API_KEY = process.env.API_KEY || 'YOUR_API_KEY_HERE';
var search = new Search(API_KEY);

/* ExpessJS Router object to handle API routes */
export const searchApi = express.Router();

searchApi.get('/search/:query', (req, res) => {
	let query = req.params.query,
		timestamp = Date.now();

	// GET BING RESULTS HERE
	search.images(query, (error, results) => {
		if (error) {
			res.status(500).json({ error })
		} else {
			res.status(200).json(results.map(createResults));
		}
	});
	
	// Save search query history asynchronously
	let queryHistory = new SearchHistory({ query, timestamp });
	queryHistory.save();
});

searchApi.get('/latest', (req, res) => {
	SearchHistory
		.find()
		.sort({ timestamp: -1 })
		.select({ _id: 0, query: 1, timestamp: 1 })
		.then(docs => {
			res.status(200).json(docs);
		});
});

/* Helper functions */
function createResults(image) {
	return {
		url: image.url,
		title: image.title,
		thumbnail: image.thumbnail.url,
		source: image.sourceUrl,
		type: image.type
	}
}