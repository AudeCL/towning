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
  profileContent.style.display = "block";
  profileExperienceTraveller.style.display = "none";
  profileExperienceHote.style.display = "none";
})
profileButtonTraveller.addEventListener("click", () => {
  profileContent.style.display = "none";
  profileExperienceTraveller.style.display = "block";
  profileExperienceHote.style.display = "none";
})
profileButtonHote.addEventListener("click", () => {
  profileContent.style.display = "none";
  profileExperienceTraveller.style.display = "none";
  profileExperienceHote.style.display = "block";
})

  
