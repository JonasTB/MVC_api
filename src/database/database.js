const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => { return console.log('Connected with database') }).catch((err) => {
        console.log(err);
        process.exit(1);
    });
}

module.exports = connectDB;