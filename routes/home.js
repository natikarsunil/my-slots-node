const router = require("express").Router();

router.get("/", checkAuthenticated, (req, res) => {
    res.render("index");
});

router.get("/home", checkAuthenticated, (req, res) => {
    res.render("index");
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/auth/login')
}

module.exports = router;