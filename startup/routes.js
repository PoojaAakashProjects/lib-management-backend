
const express = require('express');
const cors = require('cors');
const libreryRoutes = require('../routes/library.router');


module.exports =  function(app) {
    app.use(express.json());
    app.use(cors());
    app.use(libreryRoutes);
}