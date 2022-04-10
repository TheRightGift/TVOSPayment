const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/users";

const connect = mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true,});

module.exports = connect;
