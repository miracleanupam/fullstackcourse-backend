const mongoose = require("mongoose");

// Check if there are miminum arguments, password is always needed
// so at least 3 args are needed
if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://albert:${password}@cluster0.zpxlr.mongodb.net/phoneBook?retryWrites=true&w=majority`;

// Generate Id randomly, with range upto 100000
const generateId = () => {
  const limit = 100000;
  return Math.floor(Math.random() * Math.floor(limit));
};

// Create a connection
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// Create a phonebook schema
const phoneBookSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
});

// Create a model
const PhoneBookContact = mongoose.model("Contact", phoneBookSchema);

// Main logic of the script
// If there are 5 args, there are password, name and number provided in order
if (process.argv.length === 5) {
  const newContact = new PhoneBookContact({
    id: generateId(),
    name: process.argv[3],
    number: process.argv[4],
  });
  newContact.save().then((result) => {
    console.log(`Added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
} else if (process.argv.length === 3) {
  console.log("Phonebook:");
  PhoneBookContact.find({}).then((result) => {
    result.forEach((contact) => {
      console.log(`${contact.name} ${contact.number}`);
    });
    mongoose.connection.close();
  });
} else {
  // If there are other number of args, close the connection
  console.error("something went wrong");
  mongoose.connection.close();
}
