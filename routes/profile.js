const User = require("../models/User.model");
const Experience = require("../models/Experience.model");
const fileUploader = require('../config/cloudinary.config');


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
      console.log(`Error in updating the user profile: ${err}`);
      next(err)
    })
});

/* POST EDIT Profile page */
router.post("/user-profile/edit/:id", fileUploader.single('profileimg'), (req, res, next) => {
  
  User.findByIdAndUpdate(req.params.id, {
    userName: req.body.username,
    userEmail: req.body.useremail,
    passwordHash: req.body.userpwd,
    userAge: req.body.agegroup,
    userLocation: req.body.location,
    userDesc: req.body.userdescription,
    userPicture: req.file?.path
    }, {new: true})
      .then(function(updatedUser) {
        res.redirect(`/user-profile/${updatedUser.id}`)
      })
      .catch(err=> {
        console.log(`Error in updating the user profile: ${err}`);
        next(err)
      })
});

/*POST Delete Hote Experience dans User profile*/
router.post('/new-experience/:id/delete', (req, res) => {
  
  Experience.findByIdAndRemove(req.params.id)
    .then(() => {
      console.log(`Hote experience with id: ${req.params.id} deleted`)
      res.redirect("/user-profile/:id")
    })
    .catch(err => {
      console.log(`Error in deleting the hote experiences in the user profile: ${err}`);
      next(err)
    })
})

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
                console.log(`Error in displaying the hote experiences in the user profile: ${err}`);
                next(err)
              })
          })
          .catch(err=> {
            console.log(`Error in displaying the traveller experiences in the user profile: ${err}`);
            next(err)
          })
    })
    .catch(err=> {
      console.log(`Error in displaying the user profile: ${err}`);
      next(err)
    })
})

module.exports = router;