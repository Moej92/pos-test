const router = require("express").Router();

const { getHome, payment } = require("../../controllers/home/home_controller");

const { isAuthenticated } = require("../../controllers/auth/auth_middleware");

router.get("/", isAuthenticated, getHome);
router.post("/payment", isAuthenticated, payment)

module.exports = router;