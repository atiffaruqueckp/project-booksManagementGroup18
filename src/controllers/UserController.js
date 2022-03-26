const UserModel = require("../models/UserModel")

const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}
const isValidTitle = (title) => {
    return ["Mr", "Mrs", "Miss"].indexOf(title) !== -1 //this method returns the position of the first
    //  occurrence of a value in a String.
    //return -1 if value is not found, is a case sensitive.
    // indexof search in title
}



const CreateUser = async function (req, res) {
    try {

        let data = req.body;
        const { password } = data;
        if (Object.keys(data).length > 0) {

            if (!isValid(data.title)) { return res.status(400).send({ status: false, msg: "title is required" }) }

            if (!isValid(data.name)) { return res.status(400).send({ status: false, msg: "name is required" }) }

            if (!isValid(data.phone)) { return res.status(400).send({ status: false, msg: "phone is required" }) }

            if (!isValid(data.email)) { return res.status(400).send({ status: false, msg: "email is required" }) }

            if (!isValidTitle(data.title)) { return res.status(400).send({ status: false, msg: "Please type correct enum in title" }) }

            if (!isValid(data.password)) { return res.status(400).send({ status: false, msg: "password is required" }) }




            if (password.length < 8 || password.length > 15) { return res.status(400).send({ status: false, msg: "Password length should be equal or greater than 8 OR equal or less than 15" }) }


            if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(data.email))) {
                return res.status(400).send({ status: false, msg: "Please provide a valid email" })
            }
            if (!(/^[6-9]\d{9}$/.test(data.phone))) {
                return res.status(400).send({ status: false, msg: "please provide a valid phone Number" })
            }
            //if (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(data.password))) {
            //  return res.status(400).send({ status: false, msg: "Please provide a valid password" })
            //}

            let dupli = await UserModel.findOne({ email: data.email })

            if (dupli) { return res.status(400).send({ status: false, msg: "Email already exists" }) }

            let dupliPhone = await UserModel.findOne({ phone: data.phone })

            if (dupliPhone) { return res.status(400).send({ status: false, msg: "Phone Number already exists" }) }

            let savedData = await UserModel.create(data);
            return res.status(201).send({ status: true, msg: 'Success', savedData });

        } else {
            return res.status(400).send({ msg: "please enter some data" })
        }

    } catch (err) {

        return res.status(500).send({ ERROR: err.message })

    }
}

module.exports.CreateUser = CreateUser