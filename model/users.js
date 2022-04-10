const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	othername: {
		type: String
	},
	phone: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	macAddress: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
  	dateJoined: {
		type: Date,
    	default: Date.now
	}
});

let User = mongoose.model("User", userSchema);

module.exports = User;
