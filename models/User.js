//  Import 'mongoose' and 'uniqe-validator'
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


//  Set a schema for users datas
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})


//  Verify if mail address is unique
userSchema.plugin(uniqueValidator)


//  Export the user model
module.exports = mongoose.model('User', userSchema)