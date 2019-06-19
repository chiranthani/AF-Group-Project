const express = require('express');
const BookRoutes = require('./Book/Book.Routes');
const ListRoutes = require('./List/List.Routes');
const routes = express.Router();


routes.use('/book/',BookRoutes);
routes.use('/list',ListRoutes);

module.exports = routes;