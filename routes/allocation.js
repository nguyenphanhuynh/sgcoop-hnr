// alloaction.js

/**
 * Required External Modules
 */
 const express = require("express");
 const router = express.Router();
 const user = require('../controllers/user');
 const allocation = require('../controllers/allocation');
 
 require("dotenv").config();
 
/**
 * Routes Definitions
 */
router.get("/allocation", user.secure, allocation.index);


/**
 * Module Exports
 */
 module.exports = router;