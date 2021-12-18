const router = require("express").Router();
const mongoose = require("mongoose");
const fileUploader = require('../config/cloudinary.config');


// Require the Experience model in order to interact with the database
const Experience = require("../models/Experience.model");

/* GET Search Results (Experiences) page */
router.get("/search-experience", (req, res, next) => {
  console.log('Message', req.query)

  //
  // search engine
  //

  const query = {}
  if (req.query.xpcategory) {
    query.experienceType = req.query.xpcategory
  }
  if (req.query.xpcountrycity) {
    query.experienceLocation = req.query.xpcountrycity
  }

  const o = {}
  if (req.query.xpdatestart) {
    o.$gte = new Date(`${req.query.xpdatestart}T00:00:00.000Z`)
  }
  if (req.query.xpdateend) {
    o.$lte = new Date(`${req.query.xpdateend}T23:59:00.000Z`)
  }

  if (Object.keys(o).length > 0) {
    query.experienceDateTime = o
  }
  console.log('query=', query)

  Experience.find(query)
    .populate('experienceOwner')
    .then(function (experiencesFromDB) {

    console.log('experiencesFromDB', experiencesFromDB),
    res.render("experience/experience-results", {
      experiences : experiencesFromDB
    });
  })
  .catch(function (err) {
    console.log(err);
    next(err); 
  });
});

/* GET Submit New Experience FORM page */
router.get("/new-experience/create", (req, res, next) => {
  // protege ta route
  if (!req.session.currentUser) return res.redirect('/login')

    res.render("experience/experience-new");
  });

router.post("/new-experience/create", fileUploader.single('newxpimg'), (req, res, next) => {
  // registered
  if (!req.session.currentUser) return next(new Error('Please login'))

  console.log('CHECK ON OUTPUTS',req.body, req.file, req.session)  
  //ENRICH WITH USER OWNER ID 
    const experienceOwner = req.session.currentUser._id;
    const experienceType = req.body.newxpcategory;
    const experienceDateTime = new Date(`${req.body.newxpdate}T${req.body.newxptime}`);
    const experienceLocation = req.body.newxpcountrycity;
    const experienceDesc = req.body.newxpdesc;
    const experienceImg = req.file && req.file.path; // guard operator
    //const experienceImg = req.file?.path; // optional chaining


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
    
    console.log('test', experienceOwner)
    Experience.create({
      experienceOwner, experienceType, experienceDateTime, experienceLocation, experienceDesc, experienceImg
    })
      .then(function (createdExperience) {
        res.redirect("/user-profile/:id");
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/new-experience/create");
      });
});

module.exports = router;