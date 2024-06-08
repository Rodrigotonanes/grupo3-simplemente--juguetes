const checkSession = require("./checkSession");

module.exports = {
    ...require("./products.validation"),//// productsValidationStore y productsValidationUpdate
    ...require("./users.validation"),//// usersValidationSrote y usersValidationUpdate
    userValidation: require("./user.validation"),
    updateUserValidation: require("./updateUser.validations"),
    saveSession: require("./saveSession"),
    dataLocal: require("./dataLocal"),
    checkSession: require("./checkSession"),
    validactionLogin: require("./validactionLogin"),
    userId: require("./userId"),
    
}