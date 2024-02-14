const router = require("express").Router()

const {
    getInvoices
} = require("../../controllers/settings/invoice_controller")

router.get("/settings/invoice", getInvoices)

module.exports = router;