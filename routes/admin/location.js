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
router.get("/admin/locations", user.secure, location.index);
router.get("/admin/locations/create", user.secure, location.create);
router.post("/admin/locations/create", user.secure, location.createLocation);
router.get("/admin/locations/delete/:location_id", user.secure, location.deleteLocation);


/**
 * Module Exports
 */
 module.exports = router;