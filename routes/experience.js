const router = require("express").Router();

/* GET Search Results (Experiences) page */
router.get("/search-experience", (req, res, next) => {
  res.render("experience/experience-results");
});

/* GET Submit New Experience FORM page */
router.get("/new-experience/create", (req, res, next) => {
    res.render("experience/experience-new");
  });

module.exports = router;