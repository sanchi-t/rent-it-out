if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

// Importing Libraies that we installed using npm
const express = require("express")
const app = express()
const bcrypt = require("bcrypt") // Importing bcrypt package
const passport = require("passport")
const initializePassport = require("./passport-config")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")
const dotenv = require('dotenv').config()
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
    )



const users = []

app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, // We wont resave the session variable if nothing is changed
    saveUninitialized: false
}))
app.use(passport.initialize()) 
app.use(passport.session())
app.use(methodOverride("_method"))

// Configuring the register post functionality
app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}))

app.post('/profile', checkAuthenticated, (req, res) => {
    res.render("profile.ejs", {name: req.user.name, email: req.user.email})
});

app.get('/beds', checkAuthenticated, (req, res) => {
    res.render("beds.ejs", {name: req.user.name, email: req.user.email})
});

app.get('/soffa', checkAuthenticated, (req, res) => {
    res.render("soffa.ejs", {name: req.user.name, email: req.user.email})
});

app.get('/TNCC', checkAuthenticated, (req, res) => {
    res.render("TNCC.ejs", {name: req.user.name, email: req.user.email})
});

app.get('/wardrobee', checkAuthenticated, (req, res) => {
    res.render("wardrobee.ejs", {name: req.user.name, email: req.user.email})
});

app.get('/TVV', checkAuthenticated, (req, res) => {
    res.render("TVV.ejs", {name: req.user.name, email: req.user.email})
});

app.get('/checkout', checkAuthenticated, (req, res) => {
    res.render("checkout.ejs", {name: req.user.name, email: req.user.email})
});
app.get('/add', checkAuthenticated, (req, res) => {
    res.render("add.ejs")
});

// Configuring the register post functionality
app.post("/register", checkNotAuthenticated, async (req, res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(), 
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
        console.log(users); 
        res.redirect("/login")
        
    } catch (e) {
        console.log(e);
        res.redirect("/register")
    }
})

// Routes
app.get('/', checkAuthenticated, (req, res) => {
    res.render("index.ejs", {name: req.user.name})
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render("login.ejs")
})

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render("register.ejs")
})
// End Routes

app.delete("/logout", (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err)
        res.redirect("/login")
    })
})

app.use(express.static('public'))
app.use('/assets',express.static(__dirname+'public/assets'));

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect("/")
    }
    next()
}

app.listen(5000)