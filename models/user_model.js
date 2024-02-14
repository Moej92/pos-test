const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "Basic", required: true }
});

userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    console.log("hashed");
    next();
});

userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ username });

    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user
        }
        throw Error("Incorrect Password");
    }
    throw Error("Invalid Username");
}

const User = mongoose.model("user", userSchema);

module.exports = User;