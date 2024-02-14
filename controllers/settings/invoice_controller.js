const Invoice = require("../../models/invoice_model");

const getInvoices = async (req, res) => {
    const { from, to } = req.query;

    const filter = {}
    
    let fromDate, toDate;
    const now = new Date()
    if(!from) {
        fromDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else {
        fromDate = new Date(from);
    }

    filter.$gte = fromDate

    if(!from && !to) {
        toDate = new Date(fromDate);
        toDate.setDate(fromDate.getDate() + 1);
        filter.$lt = toDate
    } else {
        if(fromDate < new Date(to)) {
            toDate = new Date(to);
            filter.$lt = toDate
        }
    }

    try {
        const invoices = await Invoice.find({ date: filter }).exec();
    
        const locals = {
            page: "/settings",
            section: "invoice",
            invoices,
            fromDate,
            toDate
        }
       return res.render("pug", locals);
    } catch(e) {
        console.log(e.message)
        res.json({ error: e.message })
    }
}

module.exports = { getInvoices }