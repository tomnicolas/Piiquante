//  Import 'express' package
const express = require('express')


//  Create a express router
const router = express.Router()


//  Import controllers and middlewares for route configuration
const userCtrl = require('../controllers/user')
const emailCtrl = require('../middleware/emailCtrl')
const passwordCtrl = require('../middleware/passwordCtrl')


//  Set POST routes for user signup and login
router.post('/signup',emailCtrl, passwordCtrl, userCtrl.signup)
router.post('/login', userCtrl.login)


//  Export router
module.exports = router