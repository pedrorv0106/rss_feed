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
    else if (type == 7)
        return 'BitcoinCom';
    else if (type == 8)
        return 'NewsBTC';
    else if (type == 9)
        return 'WalletInvestor';
    else if (type == 10)
        return 'Reddit';
    else if (type == 11)
        return 'BitcoinMagazine';
    else if (type == 12)
        return 'Minergate';
    else if (type == 13)
        return 'Kraken';
    else if (type == 14)
        return 'FinanceMagnates';
    else if (type == 15)
        return 'Coinsutra';
    else if (type == 16)
        return 'Coingape';
    else if (type == 17)
        return 'Cryptopotato';
    else if (type == 18)
        return 'BitcoinExchange';
    else if (type == 19)
        return 'Reuters';
    else if (type == 20)
        return 'Zycrypto';
    else if (type == 21)
        return 'Bitcoinist';
    else if (type == 22)
        return 'EthereumNetw';
    else if (type == 23)
        return 'CryptoAmb';
    else if (type == 24)
        return 'Cryptodailyuk';
    else if (type == 25)
        return 'ETHNews';
    else if (type == 26)
        return 'Bravenewcoin';
    else if (type == 27)
        return 'ConsenSys';
}
var preAction = function (req, res, next) {
    next();
};
const router = express.Router();
router.get('/feed', preAction, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var resultArrs = [];
        var json_data = {
            "status": 'success',
            "data": []
        };
        try {
            var latestRss = yield dbMysql.get_latest_rss(0);
            var from;
            for (var i = 0; i < latestRss.length; i++) {
                from = getFromString(latestRss[i].type);
                resultArrs[resultArrs.length] = {
                    headline: latestRss[i].title,
                    description: latestRss[i].content,
                    url: latestRss[i].url,
                    timestamp: latestRss[i].isodate,
                    source: from,
                    dbId: latestRss[i].id,
                    topic: latestRss[i].topic,
                };
            }
            json_data['count'] = latestRss.length;
            json_data['sources'] = 19;
            json_data['oldestStory'] = (moment(new Date()).diff(latestRss[latestRss.length - 1].isodate) / (3600000)).toFixed(2) + ' Hours';
            json_data['newestStory'] = (moment(new Date()).diff(latestRss[0].isodate) / (3600000)).toFixed(2) + ' Hours';
            json_data['data'] = resultArrs;
        }
        catch (e) {
            console.log(e);
            json_data['status'] = "fail";
            json_data['data'] = [];
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
                    headline: latestRss[i].title,
                    description: latestRss[i].content,
                    url: latestRss[i].url,
                    timestamp: latestRss[i].isodate,
                    source: from,
                    dbId: latestRss[i].id,
                    topic: latestRss[i].topic,
                };
            }
            json_data['count'] = latestRss.length;
            json_data['sources'] = 19;
            json_data['oldestStory'] = (moment(new Date()).diff(latestRss[latestRss.length - 1].isodate) / (3600000)).toFixed(2) + ' Hours';
            json_data['newestStory'] = (moment(new Date()).diff(latestRss[0].isodate) / (3600000)).toFixed(2) + ' Hours';
            json_data['data'] = resultArrs;
        }
        catch (e) {
            console.log(e);
            json_data['status'] = "fail";
            json_data['data'] = [];
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
