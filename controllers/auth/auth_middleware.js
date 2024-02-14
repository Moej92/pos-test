const User = require("../../models/user_model")
const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, "moej salon secret", (err, decodedToken) => {
            if(err) {
                res.redirect("/login");
            }
            else {
                next();
            }
        })
    }
    else {
        res.redirect("/login");
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, "moej salon secret", async (err, decodedToken) => {
            if(err) {
                console.error(err.message);
                res.locals.user = null;
                next();
            }
            else {
                const user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    }
    else {
        // res.local.user = null;
        next();
    }
}

module.exports = { isAuthenticated, checkUser }