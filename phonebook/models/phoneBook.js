const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const url = process.env.MONGODB_URI;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).then(result => {
  console.log("Connected to MongoDB");
}).catch(error => {
  console.log("Can't connect to MongoDB", error.message);
});

// Create a phonebook schema
const phoneBookSchema = new mongoose.Schema({
  id: Number,
  name: { type: String, unique: true, required: true, minlength: 3 },
  number: { type: String, required: true, minlength:8 },
});

phoneBookSchema.plugin(uniqueValidator);

phoneBookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Contact", phoneBookSchema);
