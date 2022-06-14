require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.MONGO_URI;

mongoose
  .connect(url)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number:{
    type: String,
    validate: {
      validator: function(v) {
        return /\d{3,4}-\d+/.test(v);
      }
    }
  } ,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model("Person", personSchema);
