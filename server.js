const express = require('express');
const app = express();
require('dotenv').config();
require('./sevices/database.service')();
require('./startup/routes')(app);
const PORT = process.env.PORT || 3001;

app.listen(PORT,() => {
    console.log(`server is running in port ${PORT}`)
})