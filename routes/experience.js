const router = require("express").Router();

/* GET Search Results (Experiences) page */
router.get("/search-experience", (req, res, next) => {
  res.render("experience/experience-results");
});

/* GET Submit New Experience FORM page */
router.get("/new-experience/create", (req, res, next) => {
    res.render("experience/experience-new");
  });

  router.post("/new-experience/create", (req, res, next) => {
    console.log(req.body) // ATT on ne récupère pas la catégorie
    
  });

module.exports = router;