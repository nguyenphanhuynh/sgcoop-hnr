// users.js

/**
 * Required External Modules
 */
 const express = require("express");
 const router = express.Router();
 
 require("dotenv").config();

/**
 * Module dependencies
 */
var user = require('../controllers/user');

/**
 * Routes Definitions
 */
router.get("/user", user.secure, user.index);


/**
 * Module Exports
 */
 module.exports = router;