const { body } = require("express-validator");

exports.insertArray = [
    body("_id").isInt().withMessage("id should be an integer"),
    body("name").isString().withMessage("class name should be a string")
                 .isLength({ min: 1 }).withMessage("name should not be empty"),
    body("supervisor").isMongoId().withMessage("Invalid supervisor ID"),
   
];
