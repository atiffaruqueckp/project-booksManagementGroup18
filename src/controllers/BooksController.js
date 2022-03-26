/*
const UserModel = require("../models/UserModel")


const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if ((value).length === 0) return false
    if (typeof value === 'string' && (value).length > 0) return true
}
const isCorrectemail = function (email) {
    return /^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(email);
}
const CreateUser = async function (req, res) {
    try {
        let data = req.body
        const { title, name, phone, email, password } = data;
        if (Object.keys(data).length = 0) { return res.status(400).send({ status: false, msg: "No data provided" }) }

        //if (Object.keys(data).length > 0) {

        if (!isValid(title)) { return res.status(400).send({ status: false, msg: "title is required" }) }
        if (title != ("Mr" || "Mrs" || "Miss")) { return res.status(400).send({ status: false, msg: "Please provide an appropriate tittle" }) }
        if (!isValid(name)) { return res.status(400).send({ status: false, msg: "name is required" }) }
        if (!isValid(phone)) { return res.status(400).send({ status: false, msg: "phone is required" }) }

        let isUniquephone = await UserModel.findOne({ phone: phone })
        if (isUniquephone) { return res.status(400).send({ status: false, msg: "This phone no is already exist" }) }

        if (!isValid(email)) { return res.status(400).send({ status: false, msg: "email is required" }) }
        if (!isValid(password)) { return res.status(400).send({ status: false, msg: "password is required" }) }
        if (!isCorrectemail(email)) { return res.status(400).send({ status: false, msg: "Please povide a valid email" }) }
        let isUniqueemail = await UserModel.findOne({ email: email })
        if (isUniqueemail) { return res.status(400).send({ status: false, msg: "email is already exists" }) }

        if (password.length < 8 || password.length > 15) { return res.status(400), send({ status: false, msg: "Password length should be greater than 8 or less than 15" }) }

        const newUser = await UserModel.create(data);
        return res.status(201).send({ status: true, msg: "Success", newUser })
    }
    catch (err) {

        return res.status(500).send({ msg: err.message })
    }

}
const login = async function (req, res) {
    try {
        const mail = req.body.email
        const pass = req.body.password
        const data = req.body
        if (Object.keys(data) == 0)
            return res.status(400).send({ status: false, msg: "No input provided" })

        //  if (Object.keys(data).length > 0) {

        if (!isValid(email)) { return res.status(400).send({ status: false, msg: "email is required" }) }

        if (!isCorrectemail(email)) { return res.status(400).send({ status: false, msg: "Please povide a valid email" }) }

        if (!isValid(pass)) { return res.status(400).send({ status: false, msg: "password is required" }) }

        if (pass.length < 8 || pass.length > 15) { return res.status(400), send({ status: false, msg: "Password length should be greater than 8 or less than 15" }) }

        const UserMatch = await UserModel.findOne({ email: mail, password: pass })

        if (!UserMatch) return res.status(400).send({ status: false, msg: "email or password is incorrect" })

        const token = jwt.sign({
            userId: UserMatch._id.toString(), iat: new Date(), exp: "30m"
        }, "Secret-key")

        res.setHeader("x-api-key", "token");
        return res.status(200).send({ status: true, msg: "you are successfully logged in", token })
    }
    catch (error) {

        return res.status(500).send({ msg: error.message })
    }
}


module.exports.CreateUser = CreateUser
module.exports.login = login */



