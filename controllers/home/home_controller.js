const Item = require("../../models/item_model");
const Invoice = require("../../models/invoice_model");

// const escpos = require('escpos');
// escpos.USB = require('escpos-usb');

// const device  = new escpos.USB(7072, 8709);

const getHome = async (req, res) => {
    const items = await Item.find({}).lean();
    const data = {}
    items.forEach(item => {
        if(!data[item.category]) {
            data[item.category] = [];
        }
        data[item.category] = [...data[item.category], {
            itemID: item._id.toString(),
            itemName: item.name,
            itemPrice: item.price
        }]
    });

    const currentInvoiceNumber = await Invoice.countDocuments({}) + 1;

    res.render("pug", { page: "/", data, currentInvoiceNumber });
}

const payment = async (req, res, next) => {
    try {
        const {
            user,
            invoiceNumber,
            payment_method,
            items,
            subtotal,
            discount,
            amount,
            change, 
            total 
        } = req.body;
    
        if(!user || !payment_method || !items || !subtotal || !total ) {
            return res.json({ error: "Missing Data" });
        }

        const newInvoice = new Invoice({
            invoiceNumber,
            date: new Date(),
            user,
            paymentMethod: payment_method,
            items,
            subtotal,
            discount,
            amount,
            change,
            total
        });

        await newInvoice.save();

        // const options = { encoding: "GB18030" /* default */ }
 
        // const printer = new escpos.Printer(device, options);
        
        // device.open(function(error){
        //     printer
        //         .font('a')
        //         .align('ct')
        //         .style('bu')
        //         .size(1, 1)
        //         .text('The quick brown fox jumps over the lazy dog')
        //         .text('敏捷的棕色狐狸跳过懒狗')
        //         .barcode('1234567', 'EAN8')
        //         .table(["One", "Two", "Three"])
        //         .tableCustom(
        //             [
        //             { text:"Left", align:"LEFT", width:0.33, style: 'B' },
        //             { text:"Center", align:"CENTER", width:0.33},
        //             { text:"Right", align:"RIGHT", width:0.33 }
        //             ],
        //             { encoding: 'cp857', size: [1, 1] } // Optional
        //         )
        //         .qrimage('https://github.com/song940/node-escpos', function(err){
        //             this.cut();
        //             this.close();
        //         });
        // });
        res.json({ sucess: "successfully saved" })
    } catch(e) {
        console.error(e)
        res.json({ error: e.message });
    }
    

}

module.exports = { getHome, payment }
