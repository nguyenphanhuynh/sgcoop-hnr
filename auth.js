// auth.js

/**
 * Required External Modules
 */
 const express = require("express");
 const router = express.Router();
 const passport = require("passport");
 
 require("dotenv").config();

/**
 * Module dependencies
 */
var user = require('./controllers/user');

/**
 * Routes Definitions
 */
router.get("/login", passport.authenticate("auth0", {
    scope: "openid email profile"
    }),
    user.login
);

router.get("/callback", user.callback);

router.get("/logout", user.logout);


/**
 * Module Exports
 */
 module.exports = router;