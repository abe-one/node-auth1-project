const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const server = express();
const usersRouter = require("./users/users-router");
const authRouter = require("./auth/auth-router");

/**
  Do what needs to be done to support sessions with the `express-session` package!
  To respect users' privacy, do NOT send them a cookie unless they log in.
  This is achieved by setting 'saveUninitialized' to false, and by not
  changing the `req.session` object unless the user authenticates.

  Users that do authenticate should have a session persisted on the server,
  and a cookie set on the client. The name of the cookie should be "chocolatechip".

  The session can be persisted in memory (would not be adequate for production)
  or you can use a session store like `connect-session-knex`.
 */

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
