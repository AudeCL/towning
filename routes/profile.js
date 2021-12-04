const router = require("express").Router();

/* GET Profile page */
router.get("/user-profile/:id", (req, res, next) => {
  res.render("profile/user-profile");
});

/* GET EDIT Profile page */
router.get("/user-profile/edit", (req, res, next) => {
    res.render("profile/user-profile-edit");
  });

module.exports = router;