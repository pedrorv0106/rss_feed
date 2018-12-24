"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const sequelize = new Sequelize('rss_feed', 'root', 'root', {
    dialect: 'mysql',
    host: '172.31.29.91'
});
/* order model define */
const Feed = sequelize.define('feed', {
    title: Sequelize.STRING,
    creator: Sequelize.STRING,
    url: Sequelize.STRING,
    content: Sequelize.STRING,
    content_snippet: Sequelize.STRING,
    topic: Sequelize.STRING,
    isodate: Sequelize.DATE,
    type: Sequelize.INTEGER,
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});
function get_latest_rss(limit) {
    if (limit == 0)
        limit = 100;
    return Feed.findAll({
        limit: limit,
        order: [['isodate', 'DESC']]
    });
}
exports.get_latest_rss = get_latest_rss;
function get_latest_topic_rss(limit, topic) {
    if (limit == 0)
        limit = 100;
    return Feed.findAll({
        limit: limit,
        where: {
            topic: topic,
        },
        order: [['isodate', 'DESC']]
    });
}
exports.get_latest_topic_rss = get_latest_topic_rss;
