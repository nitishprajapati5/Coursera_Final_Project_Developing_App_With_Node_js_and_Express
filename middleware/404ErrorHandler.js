function notFoundHandler(req,res){
    return res.status(404).json({
        message:"The Content you are looking is not available here"
    })
}

module.exports = notFoundHandler
