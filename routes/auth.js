const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    res.send("Register submit");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", (req, res) => {
    res.send("Login submit");
});

router.post("/logout", (req, res) => {
    res.send("Logout submit");
});

module.exports = router;