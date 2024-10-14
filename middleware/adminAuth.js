const dotenv = require ('dotenv')
const User = require('../models/userModel')
dotenv.config()

const adminAuthentication = async (req,res,next)=>{

    try {

         const user = await User.findById(req.user._id)

         // 1 in model is for admin
         if(user.role !== 1){
            return res.status(401).json({message:'Unuthorised Access!'})
         }
         else{
            next()
         }
        
    } catch (error) {
        console.log("User is not admin",error)
    }

}



module.exports = adminAuthentication;