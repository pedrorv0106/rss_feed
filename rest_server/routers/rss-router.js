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
const express = require("express");
const dbMysql = require("../db/dbMysql");
const moment = require("moment");
function getFromString(type) {
    if (type == 1)
        return 'CoinDesk';
    else if (type == 2)
        return 'CryptoCoin';
    else if (type == 3)
        return 'Ethereum World';
    else if (type == 4)
        return 'Coindoo';
    else if (type == 5)
        return 'Cointelegraph';
    else if (type == 6)
        return 'Coinspeaker';
}
var preAction = function (req, res, next) {
    next();
};
const router = express.Router();
router.get('/feed', preAction, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var resultArrs = [];
        var json_data = {
            "status": 'ok',
            "result": []
        };
        try {
            var latestRss = yield dbMysql.get_latest_rss(0);
            var from;
            for (var i = 0; i < latestRss.length; i++) {
                from = getFromString(latestRss[i].type);
                resultArrs[resultArrs.length] = {
                    title: latestRss[i].title,
                    url: latestRss[i].url,
                    from: from,
                    topic: latestRss[i].topic,
                    // creator: latestRss[i].creator,
                    // content: latestRss[i].content,
                    date: moment(latestRss[i].isodate).fromNow(),
                };
            }
            json_data['result'] = resultArrs;
        }
        catch (e) {
            console.log(e);
            json_data['result'] = [];
        }
        res.send(json_data);
    });
});
router.post('/feed', preAction, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var limit = req.body.limit;
        var topic = req.body.topic;
        var resultArrs = [];
        var json_data = {
            "status": 'ok',
            "result": []
        };
        try {
            var latestRss;
            var from;
            if (topic === undefined)
                latestRss = yield dbMysql.get_latest_rss(Number(limit));
            else
                latestRss = yield dbMysql.get_latest_topic_rss(Number(limit), topic);
            for (var i = 0; i < latestRss.length; i++) {
                from = getFromString(latestRss[i].type);
                resultArrs[resultArrs.length] = {
                    title: latestRss[i].title,
                    url: latestRss[i].url,
                    from: from,
                    topic: latestRss[i].topic,
                    // creator: latestRss[i].creator,
                    // content: latestRss[i].content,
                    date: moment(latestRss[i].isodate).fromNow(),
                };
            }
            json_data['result'] = resultArrs;
        }
        catch (e) {
            console.log(e);
            json_data['result'] = [];
        }
        res.send(json_data);
    });
});
// Error handler
router.use(function (err, req, res, next) {
    if (err) {
        res.status(500).send(err);
    }
});
exports.rssRouter = router;
