const { Schema, model } = require("mongoose");

const experienceSchema = new Schema(
  {
   user_id: Schema.Types.User,
   experienceType: {
       type: String, 
       Enum: ['Breakfast', 'Lunch', 'Dinner', 'Happy Hour', 'Running', 'Biking', 'Yoga', 'Extreme Sport', 'Museums', 'Must-see spots', 'Unknown spots', 'Historical spots', 'Other'],
       required: 'Please specifiy the type of experience you want to offer', 
       default: 'Other',
   },
   experienceDate: Date, 
   experienceLocation: {
       experienceCountry: String, 
       experienceCity: String,
   },
   experienceDesc: String, 
   experienceImg: {
       type: String,
       default: "../public/images/towning-pictures/ExperienceMap.jpg",
   },
   participants: [String],
  },
  {
    timestamps: true,
  }
);

const Experience = model("Experience", experienceSchema);

module.exports = Experience;