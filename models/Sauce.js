//  Import 'mongoose'
const mongoose = require('mongoose')


//  Set a schema for sauces datas
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true},
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number },
    dislikes: { type: Number },
    usersLiked: [{ type: String, default: [] }],
    usersDisliked: [{ type: String, default: [] }],
})


//  Export the sauces model
module.exports = mongoose.model('Sauce', sauceSchema)