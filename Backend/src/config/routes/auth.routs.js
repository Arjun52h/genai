const {Router} = require("express")
const authrouter = Router()
const authController = require("../controller/auth_controller")
const authMiddleware = require("../middlewares/auth.middleware")

/**
 * @route POST /api/auth/register
 * @desc register a new user // js doc comment
 * @access Public
 * 
 */
 
authrouter.post("/register", authController.registerUser)
/**
 * @route POST /api/auth/login
 * @desc login a user // js doc comment
 * @access Public
 * 
 */
authrouter.post("/login", authController.loginUser)


/**
 * @route GET /api/auth/logout
 * @desc clear token from cookie and add token to blacklist // js doc comment
 * @access Public
 * 
 */
authrouter.get("/logout", authController.logoutUser)
 

/**
 * @route GET /api/auth/logout
 * @description get the data of the logged in user // js doc comment
 * @access Private
 */
 authrouter.get("/get_me",authMiddleware.authUser , authController.getMe)
module.exports = authrouter