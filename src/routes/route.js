const express = require('express');
const router = express.Router();

const UserController = require("../Controllers/UserController")
const BooksController = require("../Controllers/BooksController")
const authenticate = require("../middleware/authentication");
const authorize = require("../middleware/authorization")
//router.get("/test-me", function (req, res) {
// res.send("My first ever api!")
//})

router.post("/register", UserController.CreateUser);

router.post("/login", UserController.login);

router.get("/books", authenticate.authenticate, BooksController.getBook);


router.post("/books", authenticate.authenticate, BooksController.createBook)

router.put("/books/:bookId", authenticate.authenticate, authorize.authCheck, BooksController.updateBooks)


module.exports = router;