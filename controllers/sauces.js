// Import 'fs' package
const fs = require('fs')


//  Import sauce model
const Sauce = require('../models/Sauce')


//  Create a new sauce
//      set Object with parse request body
//      create a new Sauce with Object datas
//          Set likes and dislikes to 0
//          Add image URL
//      Save sauce in database
//      Display validation message
//      catch error
exports.createSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce)
    const sauce = new Sauce({
        ...sauceObject,
        likes: 0,
        dislikes: 0,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
  
    sauce.save()
    .then(() => { res.status(201).json({ message: 'Sauce enregistrée !' })})
    .catch(error => { res.status(400).json( { error })})
}


//  Modify existing sauce
//      verify if request.file exist
//          if so parse and recreate imageurl
//          if not set object with req.body
//      Find the sauce to modify
//          if sauce was created by user, update sauce
//      catch error
exports.modifySauce = (req, res) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'})
            } else {
                Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
                    .then(() => { res.status(200).json({ message: 'Sauce modifiée!' })})
                    .catch(error => res.status(401).json({ error }))
            }
        })
        .catch((error) => {res.status(400).json({ error })})
}


//  Delete existing sauce
//      Find the sauce to delete
//          if sauce was created by user
//          delete associated image
//          delete sauce
//      catch error
exports.deleteSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'})
            } else {
                const filename = sauce.imageUrl.split('/images/')[1]
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({ message: 'Sauce supprimée!' })})
                        .catch(error => res.status(401).json({ error }))
                })
            }
        })
        .catch( error => {res.status(500).json({ error })})
}


//  Get one sauce with id
exports.getOneSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }))
}


//  Get all sauces
exports.getAllSauces = (req, res) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }))
}


//  Like or dislike a sauce
//      if request.body.like = 0
//          find the specific sauce
//          if user liked the sauce
//              delete like, delete user from array of usersLiked
//          if user disliked the sauce
//              delete dislike, delete user from array of usersDisliked
//      catch error
//      if  request.body.like = 1
//          update sauce(id) with a like and add user in array usersLiked
//      if  request.body.like = -1
//          update sauce(id) with a dislike and add user in array usersDisliked
exports.like = (req, res) => {
    if (req.body.like === 0) {
        Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                if (sauce.usersLiked.includes(req.body.userId)) {
                Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } })
                    .then(() => res.status(200).json({ message: "Like supprimé !" }))
                    .catch((error) => {res.status(500).json({ error })})
                }
                if (sauce.usersDisliked.includes(req.body.userId)) {
                Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } })
                    .then(() => res.status(200).json({ message: "Dislike supprimé !" }))
                    .catch((error) => {res.status(500).json({ error })})
                }
            })
            .catch((error) => {res.status(500).json({ error })})
      }
    if (req.body.like === 1) {
        Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } })
            .then(() => res.status(200).json({ message: "Like ajouté !" }))
            .catch((error) => {res.status(500).json({ error })})
    }
    if (req.body.like === -1) {
        Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } })
            .then(() => res.status(200).json({ message: "Dislike ajouté !" }))
            .catch((error) => {res.status(500).json({ error })})
    }
}

    