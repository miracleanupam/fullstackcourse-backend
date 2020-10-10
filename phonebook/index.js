// Imports
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Contact = require("./models/phoneBook");

// Register a new custom morgan token
morgan.token("customtoken", (req, res) => {
  // It needs string output so, stringyfy
  return JSON.stringify(req.body);
});

// Server App Definition
const app = express();
app.use(express.static("build"));
app.use(express.json());
app.use(cors());

// Use this after express.json because, express.json creates req.body which
// this middleware needs
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.customtoken(req, res),
    ].join(" ");
  })
);

// Error handler middleware
const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  console.error(error.name);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "Bad Request" });
  } else {
    return res.status(500).send({ error: "Something Went Wrong" });
  }

  next(error);
};

// Generate Id randomly, with range upto 100000
const generateId = () => {
  const limit = 100000;
  return Math.floor(Math.random() * Math.floor(limit));
};

// List all contacts, return 'application/json'
app.get("/persons", (req, res) => {
  Contact.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((error) => next(error));
});

// Return json for person detail, 404 if not found
app.get("/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  Contact.find({ id: id })
    .then((contact) => {
      console.log(contact);
      if (contact.length > 0) {
        res.json(contact);
      } else {
        res.status(404).send();
      }
    })
    .catch((error) => next(error));
});

// List the number of contacts at a time, return 'text/html'
app.get("/info", (req, res) => {
  const res_html = `<p>Phonebook has info for ${
    persons.length
  } people. </p><p>${new Date()}</p>`;
  res.send(res_html);
});

// Delete the perons contact, send 204 regardless of the contact exists or not
app.delete("/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  Contact.findOneAndDelete({ id: id })
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

// Endpoint for adding a phonebook contact
app.post("/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "Bad Request: Content Missing",
    });
  }

  // Check if the name already exists
  // const exists = persons.find((p) => p.name === body.name);
  // if (exists) {
  //   return res.status(409).json({
  //     error: "name must be unique",
  //   });
  // }

  const contact = new Contact({
    name: body.name,
    number: body.number,
    id: generateId(),
  });

  contact
    .save()
    .then((savedContact) => {
      res.json(savedContact);
    })
    .catch((error) => next(error));
});

app.use(errorHandler);

// Port to run the server on
const PORT = process.env.PORT;
// Attach app to port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
