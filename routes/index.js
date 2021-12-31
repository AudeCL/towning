const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("homepage", {
    user : req.session.currentUser // undefined
  });

});

module.exports = router;