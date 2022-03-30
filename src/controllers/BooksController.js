const BooksModel = require("../models/BooksModel")
const UserModel = require("../models/UserModel")
//const ReviewModel = require("../models/ReviewModel")
const mongoose = require("mongoose")
const ReviewModel = require("../models/ReviewModel")

const ObjectId = mongoose.Schema.Types.ObjectId




const isValidRequestBody = (requestBody) => {
    return Object.keys(requestBody).length > 0
}

const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isValidobjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId)
}



//CREATE BOOK API

const createBook = async function (req, res) {
    try {
        body = req.body

        const { title, excerpt, userId, ISBN, category, subcategory, releasedAt } = body

        if (!isValidRequestBody(body)) {
            return res.status(400).send({ status: false, msg: " please provide valid books details" })
        }

        if (!isValid(title)) {
            return res.status(400).send({ status: false, msg: "title is required" })
        }

        let isUsedTitle = await BooksModel.findOne({ title, isDeleted: false })

        if (isUsedTitle) {
            return res.status(400).send({ status: false, msg: `this ${title} is already used` })
        }

        if (!isValid(excerpt)) {
            return res.status(400).send({ status: false, msg: "excerpt is required" })
        }

        if (!isValid(userId)) {
            return res.status(400).send({ status: false, msg: "userId is required" })
        }

        if (!isValidobjectId(userId)) {
            return res.status(400).send({ status: false, msg: " please enter valid userId" })
        }

        let userDetails = await UserModel.findById(userId)

        if (!userDetails) {
            return res.status(404).send({ status: false, msg: "no user found" })
        }

        if (!isValid(ISBN)) {
            return res.status(400).send({ status: false, msg: " ISBN is required" })
        }

        let isUsedISBN = await BooksModel.findOne({ ISBN })

        if (isUsedISBN) {
            return res.status(400).send({ status: false, msg: `this ${ISBN} is already used` })
        }



        //please find the regex for isbn




        if (!isValid(category)) {
            return res.status(400).send({ status: false, msg: "category is required" })
        }

        if (!isValid(subcategory)) {
            return res.status(400).send({ status: false, msg: "subCategory is required" })
        }

        if (!isValid(releasedAt)) {
            return res.status(400).send({ status: false, msg: "releasedAt is required" })
        }
        else {
            let bookDetails = await BooksModel.create(body)
            return res.status(201).send({ status: true, msg: "books created successfully", data: bookDetails })
        }
    }

    catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, msg: err.message })
    }
}


const getBooks = async (req, res) => {
    try {
        const input = req.query
        const { userId, category, subcategory } = input


        if (!((userId) || (category) || (subcategory)))

            return res.status(404).send({ msg: false, msg: "plase enter some data to find book" })

        // title, excerpt, userId, category, releasedAt, reviews      

        const book = await BooksModel.find(input, { isDeleted: false }).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 }).sort({ title: 1 })

        if (!book) return res.send({ status: false, msg: "no such  data found" })

        return res.status(200).send({ status: true, data: book })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }

}

const getBooksById = async function (req, res) {
    try {
        const bookId = req.params.bookId
        if (!isValid(bookId)) {
            return res.status(400).send({ status: false, message: "please provide a bookId in path params" })
        }
        if (!isValidobjectId(bookId)) {
            return res.status(400).send({ status: false, msg: "Please provide a valid bookId in path params" })
        }
        const getBook = await BooksModel.findOne({ _id: bookId, isDeleted: false }).select({ ISBN: 0 })
        if (!getBook) {
            return res.status(404).send({ status: false, msg: "No book exist with this id" })

        }
        const reviewData = await ReviewModel.find({ bookId: bookId, isDeleted: false }).select({ bookId: 1, reviewedBy: 1, reviewedAt: 1, rating: 1, review: 1 })
        const newData = {
            _id: getBook._id,
            title: getBook.title,
            excerpt: getBook.excerpt,
            userId: getBook.userId,
            category: getBook.category,
            subcategory: getBook.subcategory,
            reviews: getBook.reviews,
            isDeleted: getBook.isDeleted,
            deletedAt: getBook.deletedAt,
            releasedAt: getBook.releasedAt,
            createdAt: getBook.createdAt,
            updatedAt: getBook.updatedAt,
            reviewdata: reviewData
        }
        return res.status(200).send({ status: true, msg: "Books List", data: newData })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

const updateBooks = async function (req, res) {
    try {
        let data = req.body
        let bookId = req.params.bookId
        if (!isValid(bookId)) {
            return res.status(404).send({ status: false, msg: "Please provide a valid bookId in path params" })

        }
        let updateBook = await BooksModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, { title: data.title, excerpt: data.excerpt, releasedate: data.releasedate, ISBN: data.ISBN }, { new: true })
        return res.status(200).send({ status: true, data: updateBook })
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}
let deleteBookById = async function (req, res) {
    try {
        let id = req.params.bookId
        if (Object.keys(id) == 0) { return res.status(400).send({ status: false, msg: 'Id not provided' }) }

        let book = await BooksModel.findById(id)
        if (!book) { return res.status(404).send({ status: false, msg: 'No Book present with this id, please provide a valid id ' }) }

        if (id) {
            let bookToBeDeleted = await BooksModel.findById(id)
            if (bookToBeDeleted.isDeleted == true) {
                return res.status(400).send({ status: false, msg: "Book has already been deleted", })

            }

            let deletedBook = await BooksModel.findOneAndUpdate({ _id: id }, { $set: { isDeleted: true, deletedAt: Date.now() } })
            return res.status(200).send({ status: true, msg: "Requested book has been deleted", data: deletedBook })
        } else {
            return res.status(400).send({ status: false, msg: "BAD REQUEST" })
        }
    }

    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })

    }

}


module.exports.createBook = createBook
module.exports.updateBooks = updateBooks
module.exports.getBooks = getBooks
module.exports.getBooksById = getBooksById
module.exports.deleteBookById = deleteBookById