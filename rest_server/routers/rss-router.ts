import * as express from 'express';
import * as dbMysql from '../db/dbMysql';

var preAction = function(req, res, next) {
    next();
};

const router:express.Router = express.Router();
router.get('/coindesk', preAction, async function(req, res) {
    var resultArrs = [];
    var json_data = {
        "status":'ok',
        "result":[]
    };

    try {
        var latestRss = await dbMysql.get_latest_rss();
        for (var i = 0; i < latestRss.length; i++) {
            resultArrs[resultArrs.length] = {
                title: latestRss[i].title,
                link: latestRss[i].link,
                creator: latestRss[i].creator,
                content: latestRss[i].content,
                date: latestRss[i].isodate,
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
