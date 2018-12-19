"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/my_database', function (err) {
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
function insert_rss(title, url) {
    return __awaiter(this, void 0, void 0, function* () {
        const RssFeed = new RssFeedModel();
        RssFeed.title = title;
        RssFeed.url = url;
        RssFeed.date = Date();
        return RssFeed.save();
    });
}
exports.insert_rss = insert_rss;
