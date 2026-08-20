const jwt = require("jsonwebtoken")
const blacklistModel = require("../models/blacklist_model")

async function authUser(req, res ,next){

    console.log("🔥 AUTH MIDDLEWARE HIT");
    const token = req.cookies.token
    
    if(!token){
        return res.status(401).json({error : "Unauthorized"})
    }
    const isBlackListed = await blacklistModel.findOne({token})
    if(isBlackListed){
        return res.status(401).json({error : "token is invalid"})
    }
    try
    {
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
    req.user = decoded
    next()
    }
    catch(err){
        return res.status(401).json({error : "Unauthorized"})
    }
}

module.exports={authUser}