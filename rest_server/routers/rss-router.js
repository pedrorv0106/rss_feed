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
var preAction = function (req, res, next) {
    next();
};
const router = express.Router();
router.get('/coindesk', preAction, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var resultArrs = [];
        var json_data = {
            "status": 'ok',
            "result": []
        };
        try {
            var latestRss = yield dbMysql.get_latest_rss(0);
            for (var i = 0; i < latestRss.length; i++) {
                resultArrs[resultArrs.length] = {
                    title: latestRss[i].title,
                    url: latestRss[i].url,
                    creator: latestRss[i].creator,
                    content: latestRss[i].content,
                    date: latestRss[i].isodate,
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
router.post('/coindesk', preAction, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var limit = req.body.limit;
        var resultArrs = [];
        var json_data = {
            "status": 'ok',
            "result": []
        };
        try {
            var latestRss = yield dbMysql.get_latest_rss(Number(limit));
            for (var i = 0; i < latestRss.length; i++) {
                resultArrs[resultArrs.length] = {
                    title: latestRss[i].title,
                    url: latestRss[i].url,
                    creator: latestRss[i].creator,
                    content: latestRss[i].content,
                    date: latestRss[i].isodate,
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
