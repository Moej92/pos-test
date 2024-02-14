const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: { type: Number, unique: true },
    date: { type: Date, default: Date.now, required: true },
    items: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        qty: { type: Number, required: true }
    }],
    subtotal: { type: Number, required: true },
    discount: { type: Number, required: true },
    amount: { type: Number, required: true },
    change: { type: Number, required: true },
    total: { type: Number, required: true },
    user: { type: String, required: true },
    paymentMethod: { type: String, required: true },
})

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
