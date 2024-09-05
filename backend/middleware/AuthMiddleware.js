const jwt = require("jsonwebtoken");

require("dotenv").config();

const Auth = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res.sendStatus(403);
  }

  const token = req.headers["authorization"].split(" ")[1];

  if (!token) return res.sendStatus(403);

  jwt.verify(token, process.env.JW_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    console.log("userrr", user);
    req.user = user;

    next();
  });
};

module.exports = Auth;
