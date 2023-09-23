const mongoose = require('mongoose');


var dbUrl = process.env.MONGO_URL;

module.exports = () => {
    try {
        mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        mongoose.connection.on('connected', () => {
            console.log(`connected to mongoDB ${ dbUrl }`);

        });
        mongoose.connection.on('error', (err) => {
            console.log(`MongoDB has occured ${err}`);

        });

        mongoose.connection.on('disconnected', () => {
            console.log(`MongoDB disconnected`);
        });

    }
    catch(err) {
        console.error(err);
    }
}