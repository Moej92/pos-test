const mongoose = require("mongoose");

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { dbName: "salon_pos" })
        console.log(mongoose.connection.readyState)
    } catch(e) {
        console.error(e);
    }
    
}

module.exports = connection;