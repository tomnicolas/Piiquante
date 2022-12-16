// Import of 'validator' package
const validator = require("validator")


// Email address verification
//    if not valid error message status 400
//    else next()
module.exports = function (req, res, next) {
  if (!validator.isEmail(req.body.email)) {
    return res.status(400).json({ message: "Veuillez saisir une adresse mail valide !" })
  } else {
    next()
  }
}