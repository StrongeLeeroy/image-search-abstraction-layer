import mongoose from 'mongoose';

var searchHistorySchema = mongoose.Schema({
	timestamp: Number,
	query: String
});
searchHistorySchema.index({ timestamp: 1 });
searchHistorySchema.set('autoIndex', false);

export var SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);