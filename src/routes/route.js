const express = require('express');
const router = express.Router();

const UserController = require("../Controllers/UserController")
//const InternController = require("../Controllers/InternController")

//router.get("/test-me", function (req, res) {
// res.send("My first ever api!")
//})

router.post("/register", UserController.CreateUser);

//router.post("/login", UserController.login);



module.exports = router;