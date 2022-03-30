const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Book7 "     // refs to book model},
        },
        reviewedBy: {
            type: String,
            required: true,
            default: "Guest",
            trim: true,
           // value: "reviewer's name"
        },

        reviewedAt: {
            type: Date,
            //required: true
        },

        rating: {
            type: Number,
            required: true,
            minimum: 1,
            maximum: 5
        },

        review: {
            type: String,
            trim: true,
            //required: false         //optional
        },

        isDeleted: {
            type: Boolean,
            default: false
        },
    },
);

module.exports = mongoose.model("Review7", ReviewSchema);