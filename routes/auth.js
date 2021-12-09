const router = require("express").Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// Require the User model in order to interact with the database
const User = require("../models/User.model");


//USER REGISTRATION: SIGNUP
router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  console.log('Récupération de données', req.body)
  const userName = req.body.username;
  const userEmail = req.body.useremail; 
  const passwordHash = req.body.userpwd;
  const passwordHashRepeat = req.body.userpwdrepeat;
  const signedTerms = req.body.signedTerms === 'yes' ? true : false;
  
  if (!userName) {
    return res
      .status(400)
      .render("auth/signup", { errorMessage: "Please provide your username." });
  }

  if (signedTerms === false) {
    return res
      .status(400)
      .render("auth/signup", { errorMessage: "Please read and accept Terms and Conditions." });
  }

  if (passwordHash != passwordHashRepeat) {
    return res
      .status(400)
      .render("auth/signup", { errorMessage: "Please make sure to capture the same passwords in Password and Repeat Password fields." });
  }

  if (passwordHash.length < 8) {
    return res.status(400).render("auth/signup", {
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }

  if (!userEmail) {
    return res
      .status(400)
      .render("auth/signup", { errorMessage: "Please provide your email address." });
  }

  User.findOne({ userEmail }).then((found) => {
    // If the user is found, send the message email is displayed
    if (found) {
      return res
        .status(400)
        .render("auth/signup", { errorMessage: "Email already taken." });
    }

    // if user is not found, create a new user - start with hashing the password
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(passwordHash, salt))
      .then((passwordHash) => {
        // Create a user and save it in the database
        return User.create({
          userName,
          userEmail,
          signedTerms, 
          passwordHash,
        });
      })
      .then((userFromDB) => {
        // Bind the user to the session object
        req.session.currentUser = userFromDB
        res.redirect("/user-profile/edit");
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
           res
            .status(400)
            .render("auth/signup", { errorMessage: error.message });
        } else if (error.code === 11000) {
           res.status(400).render("auth/signup", {
            errorMessage:
              "Email need to be unique. The email you chose is already in use.",
          });
        } else {
          next(error)
        }
      });
  });
});

//USER LOGIN
router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.post("/login", (req, res, next) => {
  const { useremail, userpwd } = req.body;



  // Search the database for a user with the email submitted in the form
  User.findOne({ userEmail: useremail })
    .then((userFromDB) => {
      // If the user isn't found, send the message that user provided wrong credentials
      if (!userFromDB) {
        return res
          .status(400)
          .render("auth/login", { errorMessage: "Wrong email." });
      }

      // If user is found based on the email, check if the in putted password matches the one saved in the database
      bcrypt.compare(userpwd, userFromDB.passwordHash).then((isSamePassword) => {
        if (!isSamePassword) {
          return res
            .status(400)
            .render("auth/login", { errorMessage: "Wrong credentials." });
        }
        req.session.currentUser = userFromDB;
        return res.redirect("/");
      });
    })

    .catch((err) => {
      next(err);
      // return res.status(500).render("auth/login", { errorMessage: err.message });
    });
});

module.exports = router;
