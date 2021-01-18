// const mongoose = require('mongoose')
import mongoose from 'mongoose';
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const GameSchema = new Schema({
    ID :{
        type: String,
		required: [true, 'ID field is required.']
    },
	size: {
		type: Number,
		required: [true, 'Number field is required.']
    },
    board: {
        type: [String], //step: A-19, done: 0-D, surrender: 0-S
        required: [true, 'board field is required.']
    },
    black:{
       name: {type: String, required: [true, 'black name field is required.']},
       id: {type: String, required: [true, 'uuvid black field is required.']},
       level: {type: String}     
    },
    white:{
        name: {type: String, required: [true, 'white name field is required.']},
        id: {type: String, required: [true, 'uuvid white field is required.']},

        level: {type: String}
    },
    stepCount:{
        type: Number,
        required: [true, 'stepCount field is required.']
    },
	winner: {
		type: String,
    },
    isComplete: {
        type: Boolean,
        required: [true, 'isComplete is needed']
    }
})

// Creating a table within database with the defined schema
const Game = mongoose.model('game', GameSchema)

// Exporting table for querying and mutating
// module.exports = Game;
export default Game;
