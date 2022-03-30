const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId

const BooksSchema = new mongoose.Schema(



    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        excerpt: {
            type: String,
            required: true,
            trim: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User7"
        },
        ISBN: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        subcategory: {
            type: [String],
            required: true,
            
        },
        reviews: {
            type: Number,
            default: 0,
            //comment: Number 
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        deletedAt: {
            type: Date              // when the document is deleted
            //default: Date.now     // date time 

        },
        releasedAt: {
            type: Date,
            required: true,
            format: String         // format("YYYY-MM-DD")

        },


    },
    { timestamps: true }
);
module.exports = mongoose.model("Book7", BooksSchema);