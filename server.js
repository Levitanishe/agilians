"use strict"
const restify = require('restify');
require('./mongoose');
const Router = require('./router');
const router = new Router();

const server = restify.createServer();

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
router.makeRoutes(server);


server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});