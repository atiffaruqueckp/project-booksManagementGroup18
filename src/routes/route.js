const express = require('express');
const router = express.Router();

const UserController = require("../Controllers/UserController")
const BooksController = require("../Controllers/BooksController")
const authenticate = require("../middleware/authentication");
const authorize = require("../middleware/authorization")
const ReviewController = require("../Controllers/ReviewController")
//router.get("/test-me", function (req, res) {
// res.send("My first ever api!")
//})

router.post("/register", UserController.CreateUser);

router.post("/login", UserController.login);

router.post("/books", authenticate.authenticate, BooksController.createBook)

router.get("/books", authenticate.authenticate, BooksController.getBooks);

router.get("/books/:bookId", authenticate.authenticate, BooksController.getBooksById);

router.put("/books/:bookId", authenticate.authenticate, authorize.authCheck, BooksController.updateBooks)

router.delete("/books/:bookId", authenticate.authenticate, authorize.authCheck, BooksController.deleteBookById)

router.post("/books/:bookId/review", ReviewController.createReview);

router.put("/books/:bookId/review/:reviewId", ReviewController.updateReview);

router.delete("/books/:bookId/review/:reviewId", ReviewController.deleteReview);


module.exports = router;