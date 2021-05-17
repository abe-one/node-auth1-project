const db = require("../../data/db-config");

function find() {
  db("users");
}

/**
  resolves to an ARRAY with all users that match the filter condition
 */
function findBy(filter) {
  db("users").where(filter);
}

/**
  resolves to the user { user_id, username } with the given user_id
 */
async function findById(user_id) {
  const user = await db("users").where({ user_id }).first();
  delete user.password;
  return user;
}

/**
  resolves to the newly inserted user { user_id, username }
 */
async function add(user) {
  const userID = await db("users").insert(user);
  return findById(userID);
}

// Don't forget to add these to the `exports` object so they can be required in other modules

module.exports = {
  find,
  findBy,
  findById,
  add,
};
