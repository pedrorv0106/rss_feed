"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const sequelize = new Sequelize('rss_feed', 'root', 'root', {
    dialect: 'mysql'
});
/* order model define */
const Coindesk = sequelize.define('coindesks', {
    title: Sequelize.STRING,
    creator: Sequelize.STRING,
    url: Sequelize.STRING,
    content: Sequelize.STRING,
    content_snippet: Sequelize.STRING,
    isodate: Sequelize.DATE,
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});
Coindesk.sync();
function insert_coindesk_rss(title, creator, url, content, content_snippet, isodate) {
    return Coindesk.create({
        title: title,
        creator: creator,
        url: url,
        content: content,
        content_snippet: content_snippet,
        isodate: isodate,
    });
}
exports.insert_coindesk_rss = insert_coindesk_rss;
function get_latest_rss() {
    return Coindesk.findOne({
        order: [['created_at', 'DESC']]
    });
}
exports.get_latest_rss = get_latest_rss;
