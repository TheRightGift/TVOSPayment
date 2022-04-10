const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const staffSchema = new Schema({
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
	email: {
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
    confirmed: {
        type: String,
        enum: ['N', 'Y'],
        default: 'N'
    },
    staffAuth: {
        type: String,
        enum: ['Admin', 'Staff', 'Mgt', 'Exec'],
        default: 'Staff'
    },
    dateJoined: {
		type: Date,
        default: Date.now
	}
});

let Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;
