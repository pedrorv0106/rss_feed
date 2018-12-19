import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import {rssRouter} from './routers/rss-router';

// Creates and configures an ExpressJS web server.
class App {
  // ref to Express instance
  public express: express.Application;
  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.express.use(bodyParser.urlencoded({
      extended: true
    }));
    this.express.use(bodyParser.json());
    this.routes();

    this.express.use(express.static('dist'));
  }
  // Configure Express middleware.
  private middleware(): void {}

  // Configure API endpoints.
  private routes(): void {
    this.express.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    this.express.use('/news', rssRouter);
  }
}
export default new App().express;
