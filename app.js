//  Import 'express', 'mongoose' and 'path' module
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
mongoose.set('strictQuery', true)


//  Import dotenv (.env) variables
require('dotenv').config()


//  Import routes, sauces and users
const saucesRoutes = require('./routes/sauces')
const userRoutes = require('./routes/user')


//  Connect to MongoDB
mongoose.connect(process.env.MONGODB,
{ useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'))


//  Create express Application
const app = express()


//  Parse incoming JSON req and put datas in req.body
app.use(express.json())


//  Set CORS securities
//      all origins
//      add headers to requests
//      allow methods ...
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})


//  Apply middlewares on paths
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/auth', userRoutes)
app.use('/api/sauces', saucesRoutes)


//  Export app
module.exports = app