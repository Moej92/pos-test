const router = require("express").Router()

const {
    loginPage,
    registerPage,
    register,
    login,
    logout
} = require("../../controllers/auth/auth_controller")

router.get("/register", registerPage)
router.post("/register", register)

router.get("/login", loginPage)
router.post("/login", login)

router.get("/logout", logout)

module.exports = router;