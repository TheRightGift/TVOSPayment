const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pinSchema = new Schema({
    digit: {
		type: Number,
        required: true,
        unique: true
    },
    numOfDays: {
        type: Number,
		required: true
    },
    sold: {
		type: String,
		default: 'N',
    },
    amount: {
        type: String,
		required: true
    },
	used: {
		type: String,
		default: 'N',
    },
    sold: {
		type: String,
		default: 'N',
    },
	usedBy: {
        type: String,
        default: " "
    },
    usedByUserDetails: {
        type: String,
        default: " "
    },
    dateUsed: {
        type: Date,
        default: Date.now
    }, 
    dateExpire: {
        type: Date
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

let Pin = mongoose.model("Pin", pinSchema);

module.exports = Pin;
