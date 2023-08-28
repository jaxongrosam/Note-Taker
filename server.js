const express = require("express");
const fs = require("fs");
const uniqid = require("uniqid");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/notes", (req, res) => {});

app.get("*", (req, res) => {});

app.get("/api/notes", (req, res) => {});

app.post("/api/notes", (req, res) => {});
