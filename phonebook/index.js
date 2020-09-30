// Imports
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// Register a new custom morgan token
morgan.token("customtoken", (req, res) => {
  // It needs string output so, stringyfy
  return JSON.stringify(req.body);
});

// Server App Definition
const app = express();
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

// Hardcoded PhoneBook Contacts
let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

// Generate Id randomly, with range upto 100000
const generateId = () => {
  const limit = 100000;
  return Math.floor(Math.random() * Math.floor(limit));
};

// List all contacts, return 'application/json'
app.get("/persons", (req, res) => {
  res.json(persons);
});

// Return json for person detail, 404 if not found
app.get("/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    return res.json(person);
  } else {
    return res.status(404).send();
  }
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
  persons = persons.filter((p) => p.id !== id);

  res.status(204).send();
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
  const exists = persons.find((p) => p.name === body.name);
  if (exists) {
    return res.status(409).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);
  return res.json(person);
});

// Port to run the server on
const PORT = 3001;
// Attach app to port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
