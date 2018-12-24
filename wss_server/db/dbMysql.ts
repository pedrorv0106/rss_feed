import * as Sequelize from 'sequelize';
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
Feed.sync();

function insert_coindesk_rss(title, creator, url, content, content_snippet, topic, isodate, type) {
  var strContent = String(content);
  var strContentSnippet = String(content_snippet);
  
  if (strContent.length > 255)
    strContent = strContent.slice(0, 250) + ' ...';

  if (strContentSnippet.length > 255)
    strContentSnippet = strContentSnippet.slice(0, 250) + ' ...';

  return Feed.create({
      title: title,
      creator: creator,
      url: url,
      content: strContent,
      content_snippet: strContentSnippet,
      topic: topic,
      isodate: isodate,
      type: type,
  });
}

function get_latest_rss(type) {
  return Feed.findOne({
    where: {
      type: type,
    },
    order: [['created_at', 'DESC']]
  });
}

export {
  insert_coindesk_rss,
  get_latest_rss,
};
