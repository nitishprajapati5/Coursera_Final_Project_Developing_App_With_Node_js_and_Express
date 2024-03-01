const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();

const checkbydecodingToken = (token) => {
    return jwt.verify(token,process.env.TOKEN_SECRET_KEY);
}

const createToken = (user_id,username) => {
    return jwt.sign({
        user_id,username
    },
    process.env.TOKEN_SECRET_KEY);
}

module.exports = {
    checkbydecodingToken,
    createToken
}