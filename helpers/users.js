const jwt = require('jsonwebtoken');
require('dotenv').config();


const calculateToken = (userInfos) => {
    return jwt.sign(userInfos, process.env.SERVER_PRIVATE_KEY)
}

// function used as a middleware in the movie routes
const verifyToken = (req, res, next) => {
    const token = req.cookies.user_token;
    if (token) {
        jwt.verify(token, process.env.SERVER_PRIVATE_KEY, async (err, decodedToken) => {
            if (err) {
                console.log("CHECK TOKEN ERR =>", err)
                return res.status(500).send("There is an error to verify your authentication, retry later please.")
            }
            else {
                req.body.decodedToken = decodedToken;
                next();
            }
        })
    } else {
        return res.status(403).send("you do not have the permissions to perform this operation");
    }
}

module.exports = { 
    calculateToken,
    verifyToken 
};