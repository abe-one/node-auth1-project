const Users = require("../users/users-model");

/*
  If the user does not have a session saved in the server

  status 401
  {
    "message": "You shall not pass!"
  }
*/
function restricted() {}

async function checkUsernameFree(req, res, next) {
  const username = { username: req.body.username };

  try {
    const [user] = await Users.findBy(username);

    if (user?.username) {
      res.status(422).json({ message: "Username taken" });
    } else {
      next();
    }
  } catch (err) {
    next({ message: err.message, status: err.status });
  }
}

async function checkUsernameExists(req, res, next) {
  const username = { username: req.body.username };

  try {
    const user = await Users.findBy(username).first();

    if (!user.username) {
      res.status(401).json({ message: "Invalid credentials" });
    } else {
      next();
    }
  } catch (err) {
    next({ message: err.message, status: err.status });
  }
}

function checkPasswordLength(req, res, next) {
  const password = req.body.password;
  if (password && password.length > 3) {
    next();
  } else {
    res.status(422).json({ message: "Password must be longer than 3 chars" });
  }
}

// Don't forget to add these to the `exports` object so they can be required in other modules

module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength,
};
