const ReviewModel = require('../models/ReviewModel')
const BooksModel = require('../models/BooksModel')




const isValid = function (value) {
    if (typeof (value) === undefined || typeof (value) === null) { return false }
    if (typeof (value) === "string" && (value).length > 0) { return true }
    if (typeof (value) === "number" && (value).toString().length > 0) { return true }
}



const isValidObjectId = function (objectId) {
    return /^[0-9a-fA-F]{24}$/.test(objectId)
}

const createReview = async function (req, res) {
    try {
        let data = req.body;
        let id = req.params.bookId;
        const { bookId, rating } = data

        if (id != bookId) { return res.status(400).send({ status: false, msg: 'Please provide a valid book Id' }) }

        let books = await BooksModel.findById(id);
        if (!books) { return res.status(404).send({ status: false, msg: 'No book found with this id, please check yout input' }) }

        let is_Deleted = books.isDeleted;
        if (is_Deleted == true) { return res.status(404).send({ status: false, msg: 'Book is deleted, unable to find book' }) }

        if (Object.keys(data) == 0) { return res.status(400).send({ status: false, msg: 'No input provided' }) }

        if (!isValid(bookId)) { return res.status(400).send({ status: false, msg: 'Book Id is required' }) }

        if (!isValidObjectId(bookId)) { return res.status(400).send({ status: false, msg: 'Please provide a valid Book Id' }) }

        let Books = await BooksModel.findById(bookId);
        if (!Books) { return res.status(400).send({ status: false, msg: 'there is no such id in database, please provide a valid book Id' }) }

        if (!isValid(rating)) { return res.status(400).send({ status: false, msg: "Rating is required" }) }

        if (rating < 1 || rating > 5) { return res.status(400).send({ status: false, msg: "Rating must be minimum 1 and maximum 5" }) }

        data.reviewedAt = new Date();

        const updatedBook = await BooksModel.findOneAndUpdate({ _id: id }, { $inc: { reviews: +1 } }, { new: true })

        const reviews = await ReviewModel.create(data);


        return res.status(201).send({ status: true, msg: 'success', data: { ...updatedBook.toObject(), reviewsData: reviews } })

    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}


const updateReview = async function (req, res) {
    try {
        let data = req.body
        let bookId = req.params.bookId
        let reviewId = req.params.reviewId
        if (!isValid(bookId)) {
            return res.status(404).send({ messege: "Please provide  bookId" })
        }
        if (!isValidObjectId(bookId)) {
            res.status(400).send({ status: false, message: 'You Are Providing Invalid bookId' });
            return;
        }
        if (!isValid(reviewId)) {
            return res.status(404).send({ messege: "Please provide reviewId " })
        }
        if (!isValidObjectId(reviewId)) {
            res.status(400).send({ status: false, message: 'You Are Providing Invalid reviewId' });
            return;
        }
        let bookFound = await BooksModel.findOne({ _id: bookId, isDeleted: false })
        if (!bookFound) {
            return res.status(404).send({ messege: "No book found" })
        }
        let checkReview = await ReviewModel.findOne({ _id: reviewId, isDeleted: false })
        if (!checkReview) {
            return res.status(404).send({ status: false, messege: "The Review Doesn't Exist" })
        }
        if (bookFound && checkReview) {
            if (checkReview.bookId == bookId) {
                if (Object.keys(data).length == 0) {
                    return res.status(400).send({ messege: "Please Provide The Required data" })
                }

                const { reviewedBy, review, rating } = data
                if (reviewedBy) {
                    if (!isValid(reviewedBy)) {
                        return res.status(404).send({ messege: "Please provide The reviewer's name" })
                    }
                }
                if (review) {
                    if (!isValid(review)) {
                        return res.status(404).send({ messege: "Please Provide Your Review" })
                    }
                }
                if (rating) {
                    if (!isValid(rating)) {
                        return res.status(404).send({ messege: "Please Enter Rating" })
                    }
                    if (rating < 1 || rating > 5) {
                        return res.status(400).send({ status: false, messege: "Rating Value Should Be In Between 1 to 5" })
                    }
                }

                const updatedReview = await ReviewModel.findOneAndUpdate({ _id: reviewId }, { reviewedBy: reviewedBy, review: review, rating: rating }, { new: true }).select({ __v: 0 })
                return res.status(200).send({ status: true, message: 'Review updated', data: updatedReview });
            }
            else {
                return res.status(400).send({ status: false, messege: "You Are Not Authorized To Update The review" })
            }
        } else {
            return res.status(400).send({ status: false, messege: "can't find book to review " })
        }
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}


const deleteReview = async function (req, res) {
    try {
        let bookId = req.params.bookId
        let reviewId = req.params.reviewId

        if (Object.keys(bookId) == 0) {
            return res.status(400).send({ status: false, message: "bookId in params are not valid" })
        }
        if (Object.keys(reviewId) == 0) {
            return res.status(400).send({ status: false, message: "bookId in params are not valid" })
        }

        const findBook = await BooksModel.findOne({ _id: bookId, isDeleted: false })
        if (!findBook) {
            return res.status(400).send({ status: false, message: "No Book Is Present with this filter,its already deleted" })
        }

        const findReview = await ReviewModel.findOne({ _id: reviewId, isDeleted: false })
        if (!findReview) {
            return res.status(400).send({ status: false, message: "No Review Is Present with this filter, its already deleted" })
        }


        if (findBook.isDeleted == false) {
            if (findReview.isDeleted == false) {
                const deleteReviewDetails = await ReviewModel.findOneAndUpdate({ _id: reviewId }, { isDeleted: true, deletedAt: new Date() }, { new: true })


                if (deleteReviewDetails) {
                    await BooksModel.findOneAndUpdate({ _id: bookId }, { $inc: { reviews: -1 } })
                }
                return res.status(200).send({ status: true, message: "Review deleted successfully.", data: deleteReviewDetails })

            }
        } else {
            return res.status(400).send({ status: false, message: "Unable to delete .Book has been already deleted" })
        }
    }
    catch (error) {
        console.log(err)
        res.status(500).send({ status: false, msg: error.message })
    }
}



module.exports.createReview = createReview;
module.exports.updateReview = updateReview;
module.exports.deleteReview = deleteReview;