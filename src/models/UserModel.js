const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            enum: ["Mr", "Mrs", "Miss"],
            trim: true,

        },
        name: {
            type: String,
            required: true,
            trim: true,


        },

        phone: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            match: [/^([+]\d{2})?\d{10}$/, "please fill a valid phone Number"],
            minLength: 10,
            maxLength: 10

        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/,  //+ = valid character for email
                "Please fill a valid email address"

            ],
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 8,
            maxlength: 15,
           // match: [/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/, //Please type a valid password.
       // ],
        },
        address: {
            street: String,
            city: String,
            pincode: String,
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("User7", UserSchema);
