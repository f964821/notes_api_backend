//const http = require('http');
// import http from 'http'; Es lo mismo que arriba pero antes no se aceptaban los ESModules
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use((request, response, next) => {
  console.log(request.method);
  console.log(request.path);
  console.log(request.body);
  console.log("---------");
  next();
});

let notes = [
  {
    id: 1,
    content: "Algo aca 1",
    date: "2019-05-30T17:30:31.0982",
    important: true,
  },
  {
    id: 2,
    content: "Algo aca 1",
    date: "2019-05-30T17:30:31.0982",
    important: true,
  },

  {
    id: 3,
    content: "Algo aca 1",
    date: "2019-05-30T17:30:31.0982",
    important: true,
  },
  {
    id: 4,
    content: "Algo aca 1",
    date: "2019-05-30T17:30:31.0982",
    important: true,
  },
  {
    id: 5,
    content: "Algo aca 5",
    date: "2019-05-30T17:30:31.0982",
    important: true,
  },
];

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' });
//   response.end(JSON.stringify(notes));
// }); ESTA LA USABA SI NO TENIA EXPRESS

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

app.get("/api/notes", (request, response) => {
  response.send(notes);
});
app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    response.send(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

app.post("/api/notes", (request, response) => {
  const note = request.body;
  console.log(note);
  const ids = notes.map((note) => note.id);
  const maxId = Math.max(...ids);
  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== "undefined" ? note.important : false,
    date: new Date().toISOString(),
  };

  notes = [...notes, newNote];

  response.json(newNote);
});

app.use(() => console.log("ENTRE ACA"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
