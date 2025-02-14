const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const connect = () => {
    mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
}

module.exports = connect
