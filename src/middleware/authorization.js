const jwt = require("jsonwebtoken");

const authCheck = function (req,res,next){
    try{
        let token = req.headers["x-api-key"];
        let decodedToken = jwt.verify(token, "project 3");
        let UserId = req.params.UserId;
        if(UserId!=decodedToken.UserId) return res.status(401).send({status: false, msg: "You are not authorized to access this part."})
        next();
    }catch(error){
        return res.status(500).send({ msg: "Error", error: error.message })
    }
}

module.exports.authCheck = authCheck;
