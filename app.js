const express = require("express");
const path = require("path"); 
const app = express();

//Import routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");

app.use("/", authRoute);

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(app.get("port"), () => console.log("Server is up and running"));