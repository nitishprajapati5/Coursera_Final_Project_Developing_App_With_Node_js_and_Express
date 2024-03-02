const decodingToken = require('../utilities/tokens')

function authenticate(req,res,next){
    try{
        let tokenheader = req.headers.authorization;

        //Check for Token
        //console.log(tokenheader)
        if(!tokenheader || !tokenheader.startsWith("Bearer")){
            return res.status(401).json({
                message : "UNAUTHORIZED_ACCESS_ACTION"
            })
        }

        tokenheader = tokenheader.split(' ')[1];
        //console.log(tokenheader);

        const user_id = decodingToken.checkbydecodingToken(tokenheader);
        req.user = user_id;
        console.log(req.user)

        next();
    }
    catch(error){
        return res.status(401).json({
            message : "UNAUTHORIZED_ACCESS"
        });
    }
}

module.exports = authenticate
