const User = require("../../models/user_model");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, "moej salon secret", {
        expiresIn: maxAge
    })
}

const loginPage = (req, res) => res.render("pug/login");
const registerPage = (req, res) => res.render("pug/register");

const register = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        if(username && password) {
            const newUser = new User({ username, password });
            await newUser.save();
            
            const token = createToken(newUser._id)
            res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })

            return res.json(newUser)
        }
    }
    catch(err) {
        console.error(err.message);
        if(err.code === 11000) res.json({ error: "username already exist" })
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.login(username, password);
        const token = createToken(user._id)
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })

        res.status(200).json({ user: user._id })
    }
    catch(err) {
        console.error(err.message)
        res.status(400).json({ error: err.message });
    }
}

const logout = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
}


module.exports = { loginPage, registerPage, register, login, logout }