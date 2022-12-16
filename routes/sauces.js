//  Import 'express' package
const express = require('express')


//  Create a express router
const router = express.Router()


//  Import controllers and middlewares for route configuration
const saucesCtrl = require('../controllers/sauces')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')


//  Set routes for sauces 
//      GET all sauces
//      GET sauce by id
//      POST new sauce
//      PUT modify sauce
//      DELETE sauce
//      POST a user like or dislike of a sauce
router.get('/', auth, saucesCtrl.getAllSauces)
router.get('/:id', auth, saucesCtrl.getOneSauce)
router.post('/', auth, multer, saucesCtrl.createSauce)
router.put('/:id', auth, multer, saucesCtrl.modifySauce)
router.delete('/:id', auth, saucesCtrl.deleteSauce)
router.post('/:id/like', auth, saucesCtrl.like)


//  Export router
module.exports = router