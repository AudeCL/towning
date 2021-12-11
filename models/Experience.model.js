const { Schema, model } = require("mongoose");

const experienceSchema = new Schema(
  {
   user_id: { type : Schema.Types.ObjectId, ref: 'User' },
   experienceType: {
       type: String, 
       Enum: ['Breakfast', 'Lunch', 'Dinner', 'Happy Hour', 'Running', 'Biking', 'Yoga', 'Extreme Sport', 'Museums', 'Must-see spots', 'Unknown spots', 'Historical spots', 'Other'],
       required: 'Please specifiy the type of experience you want to offer', 
       default: 'Other',
   },
   experienceDateTime: {
     type: Date, 
     required: 'Please specifiy a date for your experience', 
   },
   experienceLocation: {
    type: String, 
    required: 'Please specifiy both country and city for your experience', 
  },
   experienceDesc: String, 
   experienceImg: {
     type: String,
     default:"https://images.frandroid.com/wp-content/uploads/2016/01/google-maps.png"
   },
   participants: [String],
  },
  {
    timestamps: true,
  }
);

const Experience = model("Experience", experienceSchema);

module.exports = Experience;