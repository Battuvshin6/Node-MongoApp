const express = require("express");
const app = express();
const router = express.Router();
const Users = require("../models/users");

router.get("/users", (req, res) => {
  Users.find({}, function (err, data) {
    if (err) {
      throw err;
    } else {
      return res.json({ name: "Kaze" });
    }
  });
});

router.post("/users", (req, res) => {
  const reqBody = req.body;
  let newUser = new Users(reqBody);
  newUser
    .save()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  res.send("Success");
});

module.exports = router;
