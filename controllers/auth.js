const user = require('../models/user')
const { hashPassword,compare_hashed_passwords } =  require('../utilities/passwordhashing')
const tokenization = require('../utilities/tokens')

const register = async (req,res) => {
    try{
        const username = req.body.username;
        const password  = req.body.password;

        //Check if we found the User name from Database
        const userFound = await user.findAll({
            where : {
                username : username
            }
        });
        console.log(userFound.length);
        if(userFound){
            return res.json({
                message : "Already user in Database"
            });
        }

        //Hashing the Password
        const hashedPassword = await hashPassword(password);

        //Create the Registration
        const userAdded = await user.create({
                username : username,
                password : hashedPassword
        });

        res.json({
            message : "User Registration done successfully"
        })

    }
    catch(error){
        res.status(500).json({
            message:"INTERNAL_SERVER_ERROR"
        });
    }
}

const login = async(req,res) => {
    try{
        const username = req.body.username;
        const password = req.body.password;

        //Check if we have Registration of the user or not
        const checkRegistration = await user.findOne({
            where : {
                username
            }
        });

        if(!checkRegistration){
            return res.json({
                message : "Wrong Credentials Invalid"
            });
        }
        console.log("Checking Registration ",checkRegistration.password);
        //Password Checking Process
        const isMatched = await compare_hashed_passwords(password,checkRegistration.password);
        if(!isMatched){
            return res.json({
                message : "Wrong Credentials Invalid Request"
            });
        }
        const token = tokenization.createToken(checkRegistration.Id,username);
        console.log(token);
        return res.json({
            message : "User logged in Successfully ",token
        });
    }
    catch(error){
        res.status(500).json({
            message : "INTERNAL SERVER ERROR"
        })
    }
}

module.exports = {
    register,
    login
}