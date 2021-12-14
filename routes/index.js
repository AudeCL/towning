const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("homepage");
  //res.send(req.query) ;  
});

module.exports = router;
