const JWT = require ('jsonwebtoken')
const dotenv = require ('dotenv')
dotenv.config()

//protected route Token base 
const userAuthentication= async (req, res, next)=>{
    try {
        const authHeader = req.headers.authorization;
        const decode = JWT.verify(authHeader, process.env.JWT_SECRET)

        req.user = decode;

        console.log(decode)

        next();

    } catch (error) {
        console.log("Error while Authorisation", error)
    }
}

module.exports = userAuthentication;