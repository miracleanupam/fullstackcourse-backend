// Imports
const express = require("express");

// Server App Definition
const app = express();
app.use(express.json());

// Hardcoded PhoneBook Contacts
const persons = [
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

app.get('/api/persons', (req, res) => {
    res.json(persons);
})

app.get('/info', (req, res) => {
    const res_html = `<p>Phonebook has info for ${persons.length} people. </p><p>${new Date()}</p>`;
    res.send(res_html);
})

// Port to run the server on
const PORT = 3001;
// Attach app to port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
