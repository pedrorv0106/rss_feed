import * as mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/my_database', function(err) {
  // if we failed to connect, abort
  if (err) 
  	console.log(err);
});

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const rssFeedSchema = new Schema({
  id: ObjectId,
  title: String,
  url: String,
  date: Date
});

const RssFeedModel = mongoose.model('rss', rssFeedSchema);

async function insert_rss(title, url) {
	const RssFeed = new RssFeedModel();
	RssFeed.title = title;
	RssFeed.url = url;
	RssFeed.date = Date();
	return RssFeed.save();
}

export {insert_rss}
