const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const mongoose = require("mongoose");
const { updateOne } = require("../models/Users");

router.get("/users", (req, res) => {
  Users.find({}, function (err, data) {
    if (err) {
      throw err;
    } else {
      return res.json({
        data: data,
      });
    }
  });
});

router.post("/users", (req, res, next) => {
  const reqBody = req.body;
  console.log(reqBody.name);
  console.log(JSON.stringify(req.body.name));
  let newUser = new Users({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
  });
  newUser
    .save()
    .then((data) => {
      res.status(201).json({
        message: "Handling POST requests to /users",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(201).json({
        message: "Handling POST requests to /products",
        data: err,
      });
    });
});
router.delete("/users/:id", (req, res) => {
  const iD = req.params.id;
  console.log(iD);
  Users.findByIdAndDelete({ _id: iD })
    .then((data) => {
      res.status(200).json({
        message: "Deleted successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error during delete",
        data: err,
      });
    });
});
router.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  console.log(body);
  Users.findByIdAndUpdate({ _id: id }, body, { new: true })
    .then((data) => {
      res.status(200).json({
        message: "Successfully updated",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Failed to uodate",
        data: err,
      });
    });
});
module.exports = router;
