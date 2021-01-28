const express = require("express");

const db = require("../data/dbConfig.js");

const PostRouter = require('./accounts/accounts-router');

const server = express();

server.use(express.json());

server.use('/api/accounts', PostRouter)

module.exports = server;
