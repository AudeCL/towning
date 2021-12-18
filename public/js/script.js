document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("towning JS imported successfully!");
  },
  false
);

let profileButtonProfile = document.getElementById("profile-btn-profile");
let profileButtonTraveller = document.getElementById("profile-btn-traveller");
let profileButtonHote = document.getElementById("profile-btn-hote");
let profileContent = document.getElementById("profile-content");
let profileExperienceTraveller = document.getElementById("profile-experience-traveller");
let profileExperienceHote = document.getElementById("profile-experience-hote");


profileButtonProfile.addEventListener("click", () => {
  if(profileContent.style.display != "none") {
    profileContent.style.display = "none";
  } else {
    profileContent.style.display = "block";
    profileExperienceTraveller.style.display = "none";
    profileExperienceHote.style.display = "none";
  }
})
profileButtonTraveller.addEventListener("click", () => {
  if(profileExperienceTraveller.style.display != "none") {
    profileExperienceTraveller.style.display = "none";
  } else {
    profileExperienceTraveller.style.display = "block";
    profileContent.style.display = "none";
    profileExperienceHote.style.display = "none";
  }
})
profileButtonHote.addEventListener("click", () => {
  if(profileExperienceHote.style.display != "none") {
    profileExperienceHote.style.display = "none";
  } else {
    profileExperienceHote.style.display = "block";
    profileContent.style.display = "none";
    profileExperienceTraveller.style.display = "none";
  }
})


  
