import * as express from 'express';
import * as dbMysql from '../db/dbMysql';
import * as moment from 'moment';

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
        return 'Cointelegraph'
    else if (type == 6)
        return 'Coinspeaker'
}

var preAction = function(req, res, next) {
    next();
};

const router:express.Router = express.Router();
router.get('/feed', preAction, async function(req, res) {
    var resultArrs = [];
    var json_data = {
        "status":'ok',
        "result":[]
    };

    try {
        var latestRss = await dbMysql.get_latest_rss(0);
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
            }
        }

        json_data['result'] = resultArrs;
    } catch(e) {
        console.log(e);
        json_data['result'] = [];
    }

    res.send(json_data);
});

router.post('/feed', preAction, async function(req, res) {
    var limit = req.body.limit;
    var topic = req.body.topic;
    var resultArrs = [];
    var json_data = {
        "status":'ok',
        "result":[]
    };

    try {
        var latestRss;
        var from;
        if (topic === undefined)
            latestRss = await dbMysql.get_latest_rss(Number(limit));
        else
            latestRss = await dbMysql.get_latest_topic_rss(Number(limit), topic);
        
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
            }
        }

        json_data['result'] = resultArrs;
    } catch(e) {
        console.log(e);
        json_data['result'] = [];
    }

    res.send(json_data);
});

// Error handler
router.use(function(err, req, res, next) {
    if (err) {
        res.status(500).send(err);
    }

});

export const rssRouter: express.Router = router;
