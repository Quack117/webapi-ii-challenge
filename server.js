const express = require('express')
const routerPosts = require('./data/posts/posts.js')
const server = express()



server.use(express.json());

server.use('/api/posts', routerPosts)

// server.use('')

server.get('/', (req, res) => {
    res.send(`
      <h2>Lambda Hubs API</h>
      <p>Welcome to the Lambda Hubs API</p>
    `);
  });

  module.exports = server;
