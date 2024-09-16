const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
// const KnexSessionStore = require("connect-session-knex");

const server = express();
const usersRouter = require("./users/users-router");
const authRouter = require("./auth/auth-router");

const sessionConfig = {
  name: "chocolatechip",
  secret: process.env.SESSIONSECRET || "DO NOT USE THIS, set it in .env",
  cookie: {
    maxAge: 1000 * 60 * 30, // 1000ms*60secs*30mins
    secure: false, // verify before production
    httpOnly: process.env.NODE_ENV === "development" ? false : true,
  },
  rolling: true,
  saveUninitialized: false,
  // store: new KnexSessionStore({
  //   knex: require("../data/db-config"),
  //   tablename: "sessions",
  //   sidfieldname: "session_id",
  //   createtable: true,
  //   clearInterval: 1000 * 60 * 60, //1000ms*60secs*60mins
  // }),
};

server.use(session(sessionConfig));
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (_req, res) => {
  res.json({ api: "up" });
});

// eslint-disable-next-line no-unused-vars
server.use((err, _req, res, _next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
