// const mongoose = require('mongoose')
import mongoose from 'mongoose';
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const UserSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name field is required.']
	},
	id: {
		type: String,
		required: [true, 'uuid field is required.']
    },
    level: {
		type: String
	},
	password: {
		type: String,
		required: [true, 'password field is required.']
	},
	description: {
		type: String
	}
})

// Creating a table within database with the defined schema
const User = mongoose.model('user', UserSchema)

// Exporting table for querying and mutating
// module.exports = User;
export default User;
