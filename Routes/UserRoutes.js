const express = require("express");
const {Router} = require('express');

const UserModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const USerRouter = Router();

USerRouter.get("/", async (req, res) => {
    const token = req.headers.authorization;
    try {
      jwt.verify(token, "channa", async (err, decoded) => {
        if (err) {
          res.send(`Please Login Again ${err}`);
        } else {
          let Users = await UserModel.find();
          res.send(Users);
        }
      });
    } catch (e) {
      res.send(e);
    }
  });
  
  USerRouter.post("/register", async (req, res) => {
    const { email, password, name, age } = req.body;
    try {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          const ExistingUser = await UserModel.findOne({ email });
          if (ExistingUser) {
            res.send("User Already Exist");
          } else {
            const user = new UserModel({ email, password: hash, name, age });
            await user.save();
            res.send("Registered");
          }
        }
      });
    } catch (e) {
      res.send(e);
    }
  });
  USerRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      let User = await UserModel.find({ email: email });
      if (User.length > 0) {
        bcrypt.compare(password, User[0].password, (err, result) => {
          if (result) {
            var token = jwt.sign( {userID:User[0]._id} , "channa");
            res.send({ msg: "Login SuccessFull", token: token });
          } else {
            res.send("bcryp Error");
          }
        });
      } else {
        res.send("Not Found");
      }
    } catch (e) {
      res.send("tryCathc Error");
    }
  });


  module.exports = USerRouter;