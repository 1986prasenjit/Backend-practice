import { body } from "express-validator";
const userRegistrationValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email field is required")
      .isEmail()
      .withMessage("Email is not valid"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Name field is required")
      .isLength({ min: 2 })
      .withMessage("Name Lenght should be greater than 3 char"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password field is required")
      .isLength({ min: 8, max: 20 })
      .withMessage(
        "Password Length should be more than 8 Chars and should not exceed 20 Chars"
      ),
  ];
};

export { userRegistrationValidator };
