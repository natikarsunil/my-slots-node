const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path"); 
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const methodOverride = require('method-override')

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(cors())

mongoose.connect(process.env.DB_CONNECTION_URL, {useUnifiedTopology : true, useNewUrlParser:true, useCreateIndex:true}, () => 
        console.log("DB connected!")
);

app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

//Import routes
const homeRoute = require("./routes/home");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");

app.use("/", homeRoute);
app.use("/auth", authRoute);
app.use("/users", userRoute);

app.use(flash);

const PORT = process.env.PORT || 3000;

app.set("port", PORT);
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("view engine", "ejs");

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
