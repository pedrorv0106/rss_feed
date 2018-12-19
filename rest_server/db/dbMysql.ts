import * as Sequelize from 'sequelize';
const sequelize = new Sequelize('rss_feed', 'root', 'root', {
  dialect: 'mysql',
  host: '172.31.29.91'
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

function get_latest_rss() {
  return Coindesk.findAll({
    limit: 25,
    order: [['created_at', 'DESC']]
  });
}

export {
  get_latest_rss,
};
