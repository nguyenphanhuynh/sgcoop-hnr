// alloaction.js

/**
 * Required External Modules
 */
 const express = require("express");
 const router = express.Router();
 const user = require('../../controllers/user');
 const location = require('../../controllers/admin/location');
 
 require("dotenv").config();
 
/**
 * Routes Definitions
 */
router.get("/admin/location", user.secure, location.index);


/**
 * Module Exports
 */
 module.exports = router;