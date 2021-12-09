const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: 'Email address is required',
      unique: true,
      //Add a check on email format and confirm value doesn't already exist in DB
    },
    userAge: {
      type: String,
      Enum: ['18-25yo', '26-35yo', '36-45yo', '46-55yo', '56-65yo', 'More than 65yo', 'Not specified'],
      default: 'Not specified',
    },
    userLocation: {
      userCountry: String,
      userCity: String, 
    }, 
    userDesc: String, 
    userPicture: {
      type: String, 
      default: "https://d2v9ipibika81v.cloudfront.net/uploads/sites/210/Profile-Icon.png"
    },
    signedTerms : Boolean,
    passwordHash: String,
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;