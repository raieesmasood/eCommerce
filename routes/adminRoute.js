const express = require ('express')
const router = express.Router();
const adminAuthentication = require ('../middleware/adminAuth');
const testController = require('../controllers/userController');



router.get('/test', (req,res)=>{
    res.send('Helo from protected route')
  })



module.exports = router;