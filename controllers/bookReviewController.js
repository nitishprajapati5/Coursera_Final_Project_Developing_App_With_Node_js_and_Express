const review = require('../models/bookReviewDTO')
const codeMessage = require('../config/constant')


const addReview = async (req, res) => {
    try {
        const { user_id } = req.user;
        const book_id = req.params.id;
        const review_text = req.body.data.review_comments;

        //console.log("Logging into the Data from Request", user_id, book_id, review_text);

        const foundReview = await review.findOne({
            where: {
                UserId: user_id,
                BookId: book_id
            }
        });

        console.log(foundReview === null);

        if (foundReview) {
            // const updateReview = await review.update(
            //     { review_text },
            //     {
            //         where: {
            //             UserId: user_id,
            //             BookId: book_id
            //         }
            //     }
            // );
            return res.json({
                statusCode:codeMessage.DuplicateCode,
                message: codeMessage.AlreadyReviewed,
                data:req.body
            });
        }

        const newReview = await review.create({
            UserId: user_id,
            BookId: book_id,
            review_text
        });

        res.json({
            statusCode:codeMessage.successStatusCode,
            statusMessageCode:codeMessage.SuccessCode,
            data: newReview
        });
    } catch (error) {
        res.status(500).json({
            statusCode : codeMessage.InternalServerErrorStatusCode,
            statusMessageCode:codeMessage.Internal_Server_Error
        });
    }
};

const updateReview = async(req,res) => {
    try {
        const { user_id } = req.user;
        const book_id = req.params.id;
        const review_text = req.body.data.review_comments;

        //console.log("Logging into the Data from Request", user_id, book_id, review_text);

        const foundReview = await review.findOne({
            where: {
                UserId: user_id,
                BookId: book_id
            }
        });

        //console.log(foundReview === null);

        if (foundReview) {
            const updateReview = await review.update(
                { review_text },
                {
                    where: {
                        UserId: user_id,
                        BookId: book_id
                    }
                }
            );

            return res.json({
                statusCode:codeMessage.successStatusCode,
                message: codeMessage.DataModified,
                data:req.body
            });
        }
    } catch (error) {
        res.status(500).json({
            statusCode : codeMessage.InternalServerErrorStatusCode,
            statusMessageCode:codeMessage.Internal_Server_Error
        });
    }
}

const getReview = async(req,res) =>{
    try{
        const  id  = req.params.id;
        const bookReview = await review.findAll({
            attributes : [
                "review_text"
            ],
            where : {
                BookId : id
            }
        })

        console.log(bookReview)

        if(!bookReview.length){
            return res.json({
                statusCode:codeMessage.successStatusCode,
                statusMessageCode:codeMessage.NoDataFound,
            });
        }

        res.json({
            statusCode:codeMessage.successStatusCode,
            statusMessageCode:codeMessage.SuccessCode,
            data:bookReview
        });
    }
    catch(error){
        res.status(500).json({
            statusCode : codeMessage.InternalServerErrorStatusCode,
            statusMessageCode:codeMessage.Internal_Server_Error
        });
    }
}

const deleteReview = async(req,res) => {
    try{
        const { user_id } = req.user
        const  book_id  = req.params.id;
        console.log(req.user)
        const deletedReview = await review.destroy({
            where:{
                UserId:user_id,
                BookId:book_id
            }
        });

        if(!deletedReview){
            return res.json({
                statusCode:codeMessage.successStatusCode,
                statusMessageCode:codeMessage.SuccessCode,
                message:codeMessage.NoDataFound
            });
        }

        res.json({
            statusCode:codeMessage.successStatusCode,
            statusMessageCode:codeMessage.SuccessCode,
            message:codeMessage.DataDeleted
        })
    }
    catch(error){
        res.status(500).json({
            statusCode : codeMessage.InternalServerErrorStatusCode,
            statusMessageCode:codeMessage.Internal_Server_Error
        });
    }
}

module.exports = {
    addReview,
    getReview,
    updateReview,
    deleteReview
}