const express = require("express");
const userAuthentication = require('../middleware/userAuth')

const router = express.Router();

const {signupController, loginController, testController} = require("../controllers/userController");

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/test",userAuthentication, testController);

module.exports = router;
