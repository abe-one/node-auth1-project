// Require the `restricted` middleware from `auth-middleware.js`. You will need it here!
const router = require("express").Router();
const { find } = require("./users-model");
const { restricted } = require("../auth/auth-middleware");

router.use(restricted);

router.get("/", (req, res, next) => {
  find(req.params.id)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

module.exports = router;
