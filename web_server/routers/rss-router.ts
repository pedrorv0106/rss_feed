import * as express from 'express';

var preAction = function(req, res, next) {
    next();
};

const router:express.Router = express.Router();
router.get('/feed', preAction, async function(req, res) {
    res.sendFile('index.html', {root: __dirname + '/../views/'});
});

// Error handler
router.use(function(err, req, res, next) {
    if (err) {
        res.status(500).send(err);
    }

});

export const rssRouter: express.Router = router;
