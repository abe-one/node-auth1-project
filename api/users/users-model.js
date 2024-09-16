const db = require("../../data/db-config");

function find() {
  return db.select("user_id", "username").from("users");
}

function findBy(filter) {
  // console.log("e");
  return db("users").where(filter);
}

function findById(user_id) {
  return db
    .select("user_id", "username")
    .from("users")
    .where({ user_id })
    .first();
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
