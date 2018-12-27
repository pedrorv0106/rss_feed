1. Project Structure
  - web_server
  	This is the web page of news feed.
  - rest_server
  	This is the rest api of news feed.
  - wss_server
  	This is the websocket server for saving news feed to database and notify by websocket in realtime.

2. Project Install
  - wss_server

  	First, please change the database configurations.
  		./db/dbMysql.ts

  	Second, please change the websocket server portnumber and router (current is :3001/feeds/).
  		./index.ts

  	Install dependency packages and build.
  		npm install
  		npm test
  		^C

  	Start the server.
  		node index.js

  	Now you can connect this websocket server.
  		ws://x.x.x.x:3001/feeds

  - rest_server

  	First, please change the database configurations.
  		./db/dbMysql.ts

  	Second, please change the restapi server portnumber (current is :3000/news/feed)
  		./server.ts

  	Install dependency packages and build.
  		npm install
  		npm test
  		^C

  	Start the server.
  		npm start

  	Now you can connect this restapi server.
  		http://x.x.x.x:3000/news/feed (GET)
  		http://x.x.x.x:3000/news/feed (POST limit=x&Topic=y)

  - web_server
  	First, please change the web server portnumber (current is :3002/news/feed)
  		./server.ts

  	Second, please change the websocket and restapi connection information
  		./views/global.js

  	Install dependency packages and build.
  		npm install
  		npm test
  		^C
  		npm run-script build

  	Start the server.
  		npm start

  	Now you can connect this web server.
  		http://x.x.x.x:3002/news/feed