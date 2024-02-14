require('dotenv').config()

const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

const db = require("./connection");
db();

const path = require("path");

// const cors = require("cors");

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const { checkUser } = require("./controllers/auth/auth_middleware");
app.get("*", checkUser)

app.use(require("./routes/profile/profile_router"))
app.use(require("./routes/home/home_router"))
app.use(require("./routes/auth/auth_router"))

app.use(require("./routes/settings/prodcut.router"))
app.use(require("./routes/settings/invoice.router"))


app.use((req, res, next) => {
    res.send("Not Found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
