const router = require("express").Router();

router.get("/users", (req, res) => {
    res.send("Get user");
});

router.post("/users", (req, res) => {
    res.send("Create user");
});

module.exports = router;