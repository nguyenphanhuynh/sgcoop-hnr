// user.js
/**
 * Required External Modules
 */
const passport = require("passport");
const querystring = require("querystring");

exports.index = function (req, res, next) {
    const { _raw, _json, ...userProfile } = req.user;
	res.render("user/index", {
		title: "Profile",
		userProfile: userProfile
	});
}

exports.callback = function (req, res, next) {
    passport.authenticate("auth0", (err, user, info) => {
    if (err) {
        return next(err);
    }
    if (!user) {
        return res.redirect("/login");
    }
    req.logIn(user, (err) => {
        if (err) {
        return next(err);
        }
        const returnTo = req.session.returnTo;
        delete req.session.returnTo;
        res.redirect(returnTo || "/");
    });
    })(req, res, next);
}

exports.login = function (req, res) {
    res.redirect("/");
}

exports.logout = function (req, res) {
    req.logOut();
    let protocal = req.hostname == 'localhost' ? 'http' : 'https';
    let returnTo = protocal + "://" + req.hostname;
    const port = req.connection.localPort;

    if (port !== undefined && port !== 80 && port !== 443) {
    returnTo =
        process.env.NODE_ENV === "production"
        ? `${returnTo}/`
        : `${returnTo}:${port}/`;
    }

    const logoutURL = new URL(
        `https://${process.env.AUTH0_DOMAIN}/v2/logout`
    );

    const searchString = querystring.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        returnTo: returnTo
    });
    logoutURL.search = searchString;

    res.redirect(logoutURL);
}

exports.secure = function (req, res, next) {
	if (req.user) {
		return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("/login");
 }