const router = require("express").Router();
const mongoose = require("mongoose");
const fileUploader = require('../config/cloudinary.config');


// Require the Experience model in order to interact with the database
const Experience = require("../models/Experience.model");

/* GET Search Results (Experiences) page */
router.get("/search-experience", (req, res, next) => {
  res.render("experience/experience-results");
});

/* GET Submit New Experience FORM page */
router.get("/new-experience/create", (req, res, next) => {
    res.render("experience/experience-new");
  });

router.post("/new-experience/create", fileUploader.single('newxpimg'), (req, res, next) => {
  console.log('CHECK ON OUTPUTS',req.body, req.file)  
  //ENRICH WITH USER OWNER ID 
    const experienceType = req.body.newxpcategory;
    const experienceDateTime = new Date(`${req.body.newxpdate}T${req.body.newxptime}`);
    const now = new Date(`2022-01-08T15:38:00.000+00:00`);
    const experienceLocation = req.body.newxpcountrycity;
    const experienceDesc = req.body.newxpdesc;
    const experienceImg = req.file.path;


    if (!experienceType) {
      return res
        .status(400)
        .render("experience/experience-new", { errorMessage: "Please select an experience type." });
    }

    /*if (experienceDateTime < now) {
      return res
        .status(400)
        .render("experience/experience-new", { errorMessage: "Please select valid date and time." });
    }*/
    //ADD ERROR WHEN NO DATE / TIME SELECTED BY USER

    if (!experienceLocation) {
      return res
        .status(400)
        .render("experience/experience-new", { errorMessage: "Please select a location from the drop down list."});
    }
    
    Experience.create({
      experienceType, experienceDateTime, experienceLocation, experienceDesc, experienceImg
    })
      .then(function (createdExperience) {
        res.redirect("/"); // REVOIR OU ON FAIT LE REDIRECT A LA SOUMISSION DU FORM
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/new-experience/create");
      });
});

module.exports = router;