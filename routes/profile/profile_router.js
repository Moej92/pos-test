const router = require("express").Router();

const { profile } = require("../../controllers/profile/profile_controller")

router.get("/profile", profile);

module.exports = router;