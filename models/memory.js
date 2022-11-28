const mongoose = require('mongoose')

//Schema
const Schema = mongoose.Schema
const MemorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  time: {
    type: String
  }
})

// // Model
const Memory = mongoose.model('Memory', MemorySchema)

module.exports = Memory