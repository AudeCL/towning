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
      default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmd.usembassy.gov%2Four-relationship%2Four-ambassador%2Fformer-ambassadors%2Fprofile-icon%2F&psig=AOvVaw07qzSF4eokZ6BLYTObcYJI&ust=1638713795514000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLDV1OGqyvQCFQAAAAAdAAAAABAO"
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