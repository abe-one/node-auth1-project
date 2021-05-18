const db = require("../../data/db-config");

function find() {
  db("users");
}

function findBy(filter) {
  db("users").where(filter);
}

async function findById(user_id) {
  const user = await db("users").where({ user_id }).first();
  delete user.password;
  return user;
}

async function add(user) {
  const userID = await db("users").insert(user);
  return findById(userID);
}

module.exports = {
  find,
  findBy,
  findById,
  add,
};
