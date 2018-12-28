import * as Sequelize from 'sequelize';
const sequelize = new Sequelize('rss_feed', 'root', 'root', {
  dialect: 'mysql',
  host: '172.31.29.91',
  define: {
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci'
    }
  },
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

export {
  get_latest_rss,
  get_latest_topic_rss,
};
