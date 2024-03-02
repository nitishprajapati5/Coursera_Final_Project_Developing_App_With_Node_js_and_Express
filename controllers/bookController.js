const book = require('../models/booksDTO')
const codeMessage = require('../config/constant')
const { Op }  = require('sequelize');

const getAllBooks = async (req,res) => {
    try{
        const booksData = await book.findAll();
        res.json({
            statusCode:codeMessage.successStatusCode,
            statusCodeMessage:codeMessage.SuccessCode,
            data:booksData
        })
    }
    catch(error){
        res.status(500).json({
            StatusCode : codeMessage.InternalServerErrorStatusCode,
            SuccessCodeMessage:codeMessage.Internal_Server_Error
        });
    }
}

const addBook = async(req,res) => {
    try{
        
        const title = req.body.title;
        const ISBN = req.body.ISBN;
        const author = req.body.author;

        //console.log(title,ISBN,author)
        //Check if there already book in the Database
        const duplicateBook = await book.findOne({
            where : req.body
        });

        console.log("Getting Null from Data" , duplicateBook)
        if (duplicateBook) {
            return res.json({
                statusCode:codeMessage.DuplicateStatusCode,
                statusCodeMessage:codeMessage.DuplicateCode,
            });
        }

        const addnewBook = await book.create( {
            title : title,
            ISBN : ISBN,
            author:author
        })

        res.json({
            statusCode:codeMessage.successStatusCode,
            statusCodeMessage:codeMessage.SuccessCode,
            data:addnewBook
        })
    }   
    catch(error){
        res.status(500).json({
            StatusCode : codeMessage.InternalServerErrorStatusCode,
            SuccessCodeMessage:codeMessage.Internal_Server_Error
        });
    }
}

const getBooksByISBN = async(req,res) => {
    try{
        const ISBN = req.body.ISBN;
        
        //Checking if we have a Proper ISBN Number
        if(!ISBN){
            return res.json({
                statusCode:codeMessage.BadRequestStatusCode,
                statusCodeMessage:codeMessage.BadRequestCode,
                data : {
                    message : codeMessage.ValidCode + " ISBN Code"
                }
            })
        }

        const getAllBooksbyISBN = await book.findAll({
            where : {
                ISBN : {
                    [Op.like] : `%${ISBN}%`
                }
            }
        });

        if(getAllBooksbyISBN.length){
            return res.json({
                statusCode:codeMessage.successStatusCode,
                statusCodeMessage:codeMessage.SuccessCode,
                data:getAllBooksbyISBN
            });
        }

        return res.json({
            statusCode:codeMessage.successStatusCode,
            statusCodeMessage:codeMessage.SuccessCode,
            data : {
                message : codeMessage.NoDataFound
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

const getBooksbyTitle = async(req,res) =>{
    try{
        const title = req.body.title;

        if(!title){
            return res.json({
                statusCode:codeMessage.BadRequestStatusCode,
                statusCodeMessage:codeMessage.BadRequestCode,
                data : {
                    message : codeMessage.ValidCode + " TITLE"
                }
            })
        }

        const booksData = await book.findAll({
            where : {
                title : {
                    [Op.like] : `%${title}%`
                }
            }
        });

        if(booksData.length){
            return  res.json({
                statusCode:codeMessage.successStatusCode,
                statusCodeMessage:codeMessage.SuccessCode,
                data:booksData
            })
        }


        res.json({
            statusCode:codeMessage.successStatusCode,
            statusCodeMessage:codeMessage.SuccessCode,
            data : {
                message : codeMessage.NoDataFound
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

const getBooksbyAuthor = async(req,res) => {
    try{
        const author = req.body.author;

        if(!author){
            return res.json({
                statusCode:codeMessage.BadRequestStatusCode,
                statusCodeMessage:codeMessage.BadRequestCode,
                data : {
                    message : codeMessage.ValidCode + " AUTHOR"
                }
            });
        }

        const booksData = await book.findAll({
            where : {
                author : {
                    [Op.like] : `%${author}%`
                }
            }
        });

        if(booksData.length){
            return res.json({
                statusCode:codeMessage.successStatusCode,
                statusCodeMessage:codeMessage.SuccessCode,
                data:booksData
            })
        }

        res.json({
            statusCode:codeMessage.successStatusCode,
                statusCodeMessage:codeMessage.SuccessCode,
                data:codeMessage.NoDataFound
        })

    }
    catch(error){
        res.status(500).json({
            StatusCode : codeMessage.InternalServerErrorStatusCode,
            SuccessCodeMessage:codeMessage.Internal_Server_Error
        });
    }
}
module.exports = {
    getAllBooks,
    addBook,
    getBooksByISBN,
    getBooksbyTitle,
    getBooksbyAuthor
}