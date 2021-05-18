const router = require("express").Router();
const {
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength,
} = require("./auth-middleware");
const Users = require("../users/users-model");

router.post(
  "/register",
  checkUsernameFree,
  checkPasswordLength,
  (req, res, next) => {
    Users.add(req.body)
      .then((newUser) => {
        res.status(200).json(newUser);
      })
      .catch(next);
  }
);

/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "message": "Welcome sue!"
  }

  response on invalid credentials:
  status 401
  {
    "message": "Invalid credentials"
  }
 */

/**
  3 [GET] /api/auth/logout

  response for logged-in users:
  status 200
  {
    "message": "logged out"
  }

  response for not-logged-in users:
  status 200
  {
    "message": "no session"
  }
 */

module.exports = router;
