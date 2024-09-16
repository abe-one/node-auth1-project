const Users = require("../users/users-model");

function restricted(req, _res, next) {
  req.session.user
    ? next()
    : next({ status: 401, message: "You shall not pass!" });
}

async function checkUsernameFree(req, _res, next) {
  const { username } = req.body;

  try {
    const [user] = await Users.findBy({ username });

    if (user?.username) {
      next({ status: 422, message: "Username taken" });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next({ message: err.message, status: err.status });
  }
}

async function checkUsernameExists(req, _res, next) {
  const { username } = req.body;

  try {
    const [user] = await Users.findBy({ username });

    if (!user?.username) {
      next({ status: 401, message: "Invalid credentials" });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next({ message: err.message, status: err.status });
  }
}

function checkPasswordLength(req, _res, next) {
  const password = req.body.password;
  if (password && password.length > 3) {
    next();
  } else {
    next({ status: 422, message: "Password must be longer than 3 chars" });
  }
}

module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength,
};
