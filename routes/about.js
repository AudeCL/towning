const router = require("express").Router();

/* GET about page */
router.get("/about", (req, res, next) => {
    res.render("about/about-us");
  });

  /* GET terms page*/
router.get("/terms", (req, res, next) => {
    res.render("about/terms");
  });

module.exports = router;