const user = require('../models/userDTO')
const { hashPassword,compare_hashed_passwords } =  require('../utilities/passwordhashing')
const tokenization = require('../utilities/tokens')
const codeMessage = require('../config/constant')

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
        //console.log
        if(userFound.length > 0){
            return res.json({
                StatusCodeMessage : codeMessage.SuccessCode,
                statusCode : codeMessage.DuplicateStatusCode,
                message : codeMessage.DuplicateCode
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
            StatusCodeMessage : codeMessage.SuccessCode,
            StatusCode : codeMessage.successStatusCode,
            message : codeMessage.RegistrationCode,
            data:{
                username:username,
                password:password
            }
        })

    }
    catch(error){
        res.status(500).json({
            StatusCode : codeMessage.InternalServerErrorStatusCode,
            SuccessCodeMessage:codeMessage.Internal_Server_Error
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
                statusCode : codeMessage.BadRequestStatusCode,
                StatusCodeMessage : codeMessage.BadRequestCode
            });
        }
        //console.log("Checking Registration ",checkRegistration.password);
        //Password Checking Process
        const isMatched = await compare_hashed_passwords(password,checkRegistration.password);
        if(!isMatched){
            return res.json({
                statusCode : codeMessage.BadRequestStatusCode,
                StatusCodeMessage : codeMessage.BadRequestCode
            });
        }
        const token = tokenization.createToken(checkRegistration.Id,username);
        //console.log(token);
        return res.json({
            statusCode : codeMessage.SuccessCode,
            StatusCodeMessage : codeMessage.UserLoggedCode,
            data : {
                token
            }
        });
    }
    catch(error){
        res.status(500).json({
            StatusCode : codeMessage.InternalServerErrorStatusCode,
            SuccessCodeMessage:codeMessage.Internal_Server_Error
        });
    }
}

module.exports = {
    register,
    login
}