const mongoose = require ('mongoose')
// const {config} = require('dotenv');
// config({path: './.env'});
const dotenv = require('dotenv')
dotenv.config()


const baseUrl = process.env.DB_URL


const connectDb = async ()=>{
    try {
        await mongoose.connect(`${baseUrl}/Ecommerce`)
        console.log('DB connected successfully!')
    } catch (error) {
        console.log('Eroor while connecting to DB', error)
        
    }

}

module.exports = connectDb;
