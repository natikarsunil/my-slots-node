const router = require("express").Router();
const passport =  require("passport");
const User =  require("../models/user");
const bcrypt = require("bcryptjs");
const initPassport = require("../service/passport-config");
const dotenv = require("dotenv");
const user = require("../models/user");

const SALT_FACTOR = 10;

dotenv.config();

initPassport(
    passport,
    email => getUserByEmail(email),
    id => getUserById(id)
    );

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/home')
    }
    next()
}

async function getUserById(id)
{
    return await User.findById(id);
}

async function getUserByEmail(email) 
{
    return await User.findOne({email: email});
}

router.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register");
});

router.post("/register", checkNotAuthenticated, async (req, res) => {
    
    try {

        const existingUser = await getUserByEmail(req.body.email)
        
        if(existingUser)
        {
            console.log("User with email " + req.body.email + " already exists!");
            res.render("register", {errorMessage : "User with email " + req.body.email + " already exists!"});
        }    
        else
        {
            const salt = await bcrypt.genSalt(SALT_FACTOR);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
            const user = new User({
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                email : req.body.email,
                password : hashedPassword    
            });
        
            await user.save();
    
            res.render("login", {successMessage : "You are registered successfully!"});
        }

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.get("/login", checkNotAuthenticated, (req, res) => {
    res.render("login", {registerSuccessMessage: ''});
    //res.send(User.findOne({email: "new@gmail.com"}))
});

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
  }))


router.delete("/logout", (req, res) => {
    req.logOut()
    res.redirect('/auth/login')
});

module.exports = router;