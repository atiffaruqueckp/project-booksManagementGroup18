/*const { default: mongoose } = require("mongoose")
const ReviewModel = require("../models/ReviewModel")
//const review = require("../models/reviewModel")

const BooksModel = require("../models/BooksModel")
const objectId = mongoose.Schema.Types.ObjectId


const isValidobjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId)
}
const isValidRequestBody = (requestBody) => {
    return Object.keys(requestBody).length > 0
}


const isValid = (value) => {
    {
        if (typeof value === "undefined" || value === null)
            return false

        if (typeof value === "string" && value.trim().length === 0)
            return false
    }
    return true
}


const createPost = async (req, res) => {
    try {
        const data = req.body
        const book = req.params.bookId
        if (!isValidRequestBody(data))
            return res.status(400).send({ status: false, msg: "please enter valid review details" })

        const { reviewedAt, rating, reviewedBy, bookId } = data

        if (!isValid(reviewedAt))
        return res.status(400).send({ status: false, msg: "please enter date of reviewedAt" })

        if (!isValid(rating))
            return res.status(400).send({ status: false, msg: "please enter ratings" })

        if (!isValid(reviewedBy))
            return res.status(400).send({ status: false, msg: "please enter reviewedname" })

        if (!isValid(bookId))
            return res.status(400).send({ status: false, msg: "please enter bookId" })

        const findBook = await BooksModel.findOne({ _id: book, isDeleted: false })
        if (!findBook)
            return res.status(400).send({ status: false, msg: "bookId not found please enter valid bookId" })

        if (!book)
            return res.status(400).send({ status: false, msg: "please enter bookId to find the book" })

        if (!isValidobjectId(book))
            return res.status(400).send({ status: false, msg: "enter valid bookId" })

        const reviewdatails = await ReviewModel.create(data)

        const count = await BooksModel.findOneAndUpdate({ _id: book, isDeleted: false }, { $inc: { reviews: 200 } })//this is good practice
        //{ $inc: { <field1>: <amount1>, <field2>: <amount2>, ... } }
        const details = {
            _id: reviewdatails._id,
            bookId: reviewdatails.bookId,
            reviewedBy: reviewdatails.reviewedBy,      //this way to use create and some useful data and what we want to show in output
            reviewedAt: reviewdatails.reviewedAt,
            rating: reviewdatails.rating,
            review: reviewdatails.review

        }

        return res.status(201).send({ status: true, msg: "reviewer created", data: details })

    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.createPost = createPost*/