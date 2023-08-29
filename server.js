const express = require("express");
const path = require("path");
const fs = require("fs");
const uniqid = require("uniqid");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// HTML route for notes.html
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// API routes
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) res.status(500).json(err);
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = uniqid();

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) res.status(500).json(err);
    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
      if (err) res.status(500).json(err);
      res.json(newNote);
    });
  });
});

// HTML route for wildcard
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.delete("/api/notes/:id", (req, res) => {});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
