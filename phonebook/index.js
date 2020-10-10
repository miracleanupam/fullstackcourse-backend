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

// List all contacts, return 'application/json'
app.get("/persons", (req, res, next) => {
  Contact.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((error) => next(error));
});

// Return json for person detail, 404 if not found
app.get("/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Contact.findById(id)
    .then((contact) => {
      if (contact) {
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
app.delete("/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Contact.findByIdAndDelete(id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

// Endpoint for adding a phonebook contact
app.post("/persons", (req, res, next) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "Bad Request",
    });
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  });

  contact
    .save()
    .then((savedContact) => {
      res.json(savedContact);
    })
    .catch((error) => next(error));
});

app.put("/persons/:id", (req, res) => {
  const id = req.params.id;

  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "Bad Request",
    });
  }

  const contact = {
    name: body.name,
    number: body.number,
  };

  // Without the third option, findOneAndUpdate returns the old object
  // I need new updated result
  Contact.findByIdAndUpdate(id, contact, { new: true })
    .then((updatedContact) => {
      res.json(updatedContact);
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
