const express = require("express");
const connection = require("./confiqs/db");
const UserModel = require("./Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const USerRouter = require("./Routes/UserRoutes");
const noteRouter= require("./Routes/noteRotes");
const Authenticate = require('./Middlewares/AuthMiddleware')
var cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors({origin:"*"}))
app.use('/user',USerRouter)
app.use(Authenticate);
app.use('/note',noteRouter)

app.listen(8080, async () => {
  try {
    connection;
    console.log("Connected to DB");
  } catch (e) {
    console.log("err",e);
  }
  console.log("Running Server");
});
