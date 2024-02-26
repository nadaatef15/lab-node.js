const { body, param, query } = require("express-validator");

exports.insertArray = [
    body("_id").isInt().withMessage("id should be an integer"),
    body("name").isString().withMessage("student name should be a string")
                 .isLength({ min: 1 }).withMessage("name should not be empty"),
    body("age").isInt({ min: 0 }).withMessage("age should be a non-negative integer"),
    body("level").isIn(['PreKG', 'KG1', 'KG2']).withMessage("Invalid level")
];
