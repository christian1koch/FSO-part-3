const Person = require("./models/person");
const express = require("express");
const app = express();
var morgan = require("morgan");
const cors = require("cors");

// Error Handling

const errorHandler = (error, request, response, next) => {

  if (error.name === "CastError") {
    return response.status(400).send({ error: "maldformed id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

morgan.token("object", function (req) {
  return JSON.stringify(req.body);
});
var logger = morgan(
  ":method :url :status :res[content-length] - :response-time ms :object"
);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(logger);
app.use(express.static("build"));

app.get("/info", (request, response) => {
  const date = new Date();
  Person.find({}).then((persons) => {
    response.send(
      `Phonebook has info for ${persons.length} people <br /> <br /> ${date}`
    );
  });
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  console.log;
  const person = {
    name: body.name,
    number: body.number,
  };
  console.log("works here");
  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});
app.get("/api/persons", (request, response, next) => {
  console.log("looking for persons..");
  Person.find({})
    .then((persons) => {
      if (persons) {
        response.json(persons);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(202).end();
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});
app.post("/api/persons", (request, response, next) => {
  const person = request.body;
  const newPerson = new Person({
    name: person.name,
    number: person.number,
  });
  newPerson
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(unknownEndpoint);
app.use(errorHandler);
