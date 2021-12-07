const User = require("../models/User.model");

const router = require("express").Router();

/* GET EDIT Profile page */
router.get("/user-profile/edit", (req, res, next) => {
  res.render("profile/user-profile-edit");
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
      /*.populate(user)*/
      .then(function(updatedUser) {
        res.redirect(`/user-profile/${updatedUser.id}`)
      })
      .catch(err=> {
        console.log("Error in updating the user profile");
        next(error)
      })
})

/* GET Profile page */
router.get("/user-profile/:id", (req, res, next) => {
  res.render("profile/user-profile");
});

module.exports = router;