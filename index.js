// index.js

/**
 * Required External Modules
 */
 const express = require("express");
 const path = require("path");
 
 const expressSession = require("cookie-session");
 const passport = require("passport");
 const Auth0Strategy = require("passport-auth0");
 
 require("dotenv").config();
 

/**
 * App Variables
 */
 const app = express();
 const port = process.env.PORT || "8000";

 /**
 * Session Configuration (New!)
 */
  const session = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: false
  };
  
  if (app.get("env") === "production") {
    // Serve secure cookies, requires HTTPS
    session.cookie.secure = true;
  }


/**
 * Passport Configuration (New!)
 */
 const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    /**
     * Access tokens are used to authorize users to an API
     * (resource server)
     * accessToken is the token to call the Auth0 API
     * or a secured third-party API
     * extraParams.id_token has the JSON Web Token
     * profile has all the information from the user
     */
    return done(null, profile);
  }
  );


/**
 *  App Configuration
 */
 app.locals.basedir = path.join(__dirname, 'views');
 app.set("views", path.join(__dirname, "views"));
 app.set("view engine", "pug");
 app.use(express.static(path.join(__dirname, "public")));
 
 app.use(expressSession(session));
 
 passport.use(strategy);
 app.use(passport.initialize());
 app.use(passport.session());
 
 passport.serializeUser((user, done) => {
  done(null, user);
 });
 
 passport.deserializeUser((user, done) => {
   done(null, user);
 });

 // Creating custom middleware with Express
 app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
 });
 


/**
 * Module dependencies.
 */
 var starter = require('./controllers/starter');
 var user = require('./controllers/user');
/**
 * Routes Definitions
 */
 app.get("/", user.userRedirection, starter.index);

 // Router mounting
 const authRouter = require("./routes/auth");
 const userRouter = require('./routes/users');
 const allocation = require('./routes/allocation');
 const adminLocation = require('./routes/admin/location');

 app.use("/", authRouter);
 app.use("/", userRouter);
 app.use("/", allocation);
 app.use("/", adminLocation);

/**
 * Global variables
 */
global.appName = 'Saigon Co.op - Phòng Hàng Nhãn Riêng';
global.appShortName = 'SGCo.op';

/**
 * Server Activation
 */
 app.listen(port, (req, res) => {
  console.log(`Listening to requests on :${port}`);
 });