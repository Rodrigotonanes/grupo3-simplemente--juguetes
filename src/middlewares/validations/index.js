

module.exports = {
    ...require("./products.validation"),//// productsValidationStore y productsValidationUpdate
    ...require("./users.validation"),//// usersValidationSrote y usersValidationUpdate
    userValidation: require("./user.validation"),
    updateUserValidation: require("./updateUser.validations"),
    dataLocal: require("./dataLocal"),
    validactionLogin: require("./validactionLogin"),
    userId: require("./userId"),
    
}