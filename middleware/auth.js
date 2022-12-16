//  Import of 'jsonwebtoken' package
const jwt = require('jsonwebtoken')


//  Import of 'dotenv' variables
require('dotenv').config()

 
//  Verify authenticity of user
//      get the password part of the token in header
//      decode token
//      extract user Id from token and add it to the req
//      if user valid call next
//      catch errors
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1]
       const decodedToken = jwt.verify(token, process.env.TOKEN)
       const userId = decodedToken.userId
       req.auth = {
           userId: userId
       }
    next()
   } catch(error) {
       res.status(401).json({ error })
   }
}