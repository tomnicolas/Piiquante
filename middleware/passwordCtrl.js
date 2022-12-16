//  Import of 'password-validator' package
const passwordValidator = require("password-validator")


//  Model creation
const passwordModel = new passwordValidator()


//   Model settings
passwordModel
  .is().min(8)  // Mini lenght 8
  .is().max(15)   // Max lenght  15
  .has().uppercase(1)   // Must contain 1 uppercase letter minimum
  .has().lowercase()  // Must contain lowercase letters
  .has().digits(1)  // Must contain 1 number
  .has().not().spaces()  // No spaces
  .is().not().oneOf(["Passw0rd", "Password123"]);   // Password blacklist


//  Password verification
//      if not valid error message status 400
//      else next()
module.exports = function (req, res, next) {
  if (!passwordModel.validate(req.body.password)) {
    return res.status(400).json({ message: "Le mot de passe doit contenir entre 8 et 15 caractères, avec au moins une majuscule et un chiffre !"})
  } else {
    next()
  }
}