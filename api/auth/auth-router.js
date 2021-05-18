const router = require("express").Router();
const bcrypt = require("bcryptjs");
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

router.post("/login", checkUsernameExists, (req, res, next) => {
  if (bcrypt.compareSync(req.body.password)) {
    req.session.user = req.user;
    res.status(200).json(`Welcome ${req.user.username}`);
  } else {
    next({ status: 401, message: "Invalid credentials" });
  }
});

router.get("/logout", (req, res, next) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      err
        ? next({
            message:
              "You can check out anytime you like... so please try logging out again",
          })
        : res.status(200).json("logged out");
    });
  } else {
    res.status(200).json("no session");
  }
});

module.exports = router;
