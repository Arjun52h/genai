const userModel = require("../models/user_models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const blacklistModel = require("../models/blacklist_model")
/**
 * @description register a new user
 * @name registerUser
 * @route POST /api/auth/register
 * @access Public
 */
async function registerUser(req,res){
    const {username, email, password} = req.body
    if(!username || !email || !password){
        return res.status(400).json({error : " please provide all required fields"})
    }

    const useralreadyExists = await userModel.findOne({
        $or: [{username : username} , {email : email}]
    })

        // if useralreadyexist contain user with username or email then return error message
        if(useralreadyExists){
            return res.status(400).json({error : "User already exist"})
        }

        const hash = await bcrypt.hash(password , 10)

        const user = await userModel.create({
            username : username,
            email : email,
            password : hash
        })
        const token = jwt.sign(
            {id : user._id,username : user.username },
            process.env.JWT_SECRET,
            {expiresIn : "1d"}

        )

        res.cookie("token" , token )

        res.status(201).json({
            message : "user created successfully",
            user : {
                id : user._id,
                username : user.username,
                email : user.email
            }})
        
}


/**
 * @name loginUser
 * @description username and email for login
 * @access Public
 */

async function loginUser(req,res){
    const { email, password} = req.body

    const user = await userModel.findOne({email : email})

    if(!user){
        res.status(400).json({error : "user not found "})
    }

    const isPassword = await bcrypt.compare(password , user.password)
    if(!isPassword){
        res.status(400).json({error : "invalid credentials"})
    }

    const token = jwt.sign(
            {id : user._id,username : user.username },
            process.env.JWT_SECRET,
            {expiresIn : "1d"}

        )

        res.cookie("token" , token)

        res.status(200).json({
            message : "user logged in successfully",
            user : {
                id : user._id,
                username : user.username,
                email : user.email
            }
        })
}

async function logoutUser(req,res){ // logout controller function to clear the token from cookie and add token to blacklist
    const token = req.cookies.token
    if(token){
        await blacklistModel.create({ token})
    }
    
    res.clearCookie("token")
    res.status(200).json({message : "user logged out successfully"})
}

/**
 * @name getMe
 * @description get the data of the logged in user
 * @access Private
 */

async function getMe(req,res){
    const user = await userModel.findById(req.user.id)

    if(!user){
        return res.status(404).json({error : "user not found"})
    }
    res.status(200).json({
        user:{

            id : user._id,
            username : user.username,
            email : user.email
        }
    })
}
module.exports = { registerUser, loginUser , logoutUser, getMe }