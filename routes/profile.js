const User = require("../models/User.model");
const Experience = require("../models/Experience.model");

const router = require("express").Router();

/* GET EDIT Profile page */
router.get("/user-profile/edit", (req, res, next) => {
  console.log(req.session.currentUser);
  User.findById(req.session.currentUser._id)
    .then(function(userFromDB){
        console.log(userFromDB);
        res.render("profile/user-profile-edit", {
        user: userFromDB
      });
    })
    .catch(err=> {
      console.log("Error in updating the user profile");
      next(err)
    })
});

/* POST EDIT Profile page */
router.post("/user-profile/edit/:id", (req, res, next) => {
  
  User.findByIdAndUpdate(req.params.id, {
    userName: req.body.username,
    userEmail: req.body.useremail,
    passwordHash: req.body.userpwd,
    userAge: req.body.agegroup,
    userLocation: req.body.location,
    userDesc: req.body.userdescription,
    userPicture: req.body.userpicture
    }, {new: true})
      .then(function(updatedUser) {
        res.redirect(`/user-profile/${updatedUser.id}`)
      })
      .catch(err=> {
        console.log("Error in updating the user profile");
        next(err)
      })
});

/* GET Profile page */
router.get("/user-profile/:id", (req, res, next) => {
  if(!req.session.currentUser){
    res.redirect('/login');
    return;
  }
  User.findById(req.session.currentUser._id)
    .then(function(userFromDB){
        console.log(userFromDB);
        Experience.find({participants: { $in: [userFromDB._id]}})
          .then(function(experiencesFromDB){
            Experience.find({user: req.session.currentUser._id})
              .then(function(expFromDB) {
                res.render("profile/user-profile", {
                  user: userFromDB,
                  travellerExperience: experiencesFromDB,
                  hoteExperience: expFromDB,
                })
              })
              .catch(err => {
                console.log("Error in displaying the hote experiences in the user profile");
                next(err)
              })
          })
          .catch(err=> {
            console.log("Error in displaying the traveller experiences in the user profile");
            next(err)
          })
    })
    .catch(err=> {
      console.log("Error in displaying the user profile");
      next(err)
    })

  /*User.findById(req.session.currentUser._id)
    .then(function(userFromDB){
        console.log(userFromDB);
        res.render("profile/user-profile", {
            user: userFromDB,
          })
        })
    .catch(err=> {
      console.log("Error in displaying the user profile");
      next(err)
    })*/
})

module.exports = router;