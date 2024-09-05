const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
module.exports = {
  signUp: async (req, res) => {
    try {
      const body = req.body;
      const alreadyexist = await User.findOne({
        where: {
          email: body.email,
        },
      });

      if (alreadyexist) return res.status(400).send("user already exists");

      console.log(body);
      body.password = await bcrypt.hash(body.password, saltRounds);
      console.log(body, "body 2 ");

      await User.create(body);
      res.status(201).send("user created");
    } catch (error) {
      throw error;
      res.status(500).send(error);
    }
  },
  signIn: async (req, res) => {
    console.log("5altet");

    try {
      const body = req.body;
      console.log(body);

      const checkUser = await User.findOne({ where: { email: body.email } });

      console.log("bodyyyy ", body);
      console.log("bodyyyy password", checkUser);
      if (
        !checkUser ||
        !(await bcrypt.compare(body.password, checkUser.password))
      ) {
        return res.status(401).send({ error: "Invalid credentials" });
      } else {
        const token = jwt.sign({ id: checkUser.id }, process.env.JW_SECRET, {
          expiresIn: "1h",
        });

        res.json({
          message: "successfully logged in",
          token: token,
          userId: checkUser.id,
        });
      }
    } catch (error) {
      throw error;
      res.status(500).send(error);
    }
  },
  getUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ["id", "username", "ProfilePicture"],
        where: {
          id: { [Op.ne]: req.user.id },
        },
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
  },
};
