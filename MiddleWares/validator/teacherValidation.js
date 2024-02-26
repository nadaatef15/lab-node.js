
const { body } = require("express-validator");
exports.insertArray = [
    body("firstname").isString().withMessage("First name should be a string").custom(async (value) => {
        // Check if a teacher with the same first name already exists
        const existingTeacher = await Teacher.findOne({ firstname: value });
        if (existingTeacher) {
            throw new Error("First name must be unique");
        }
        return true;
    }),
    body("lastname").isString().withMessage("Last name should be a string"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isString().withMessage("Password should be a string"),
    body("image").optional().isString().withMessage("Image should be a string"),
];
