const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const handlebars = require("express-handlebars");
const path = require("path");
const Task = require("../models/tuskSchema");

const hbs = handlebars.create({
  defaultLayout: "layout",
  extname: "hbs",
  layoutsDir: path.join(__dirname, "views"),
  partialsDir: path.join(__dirname, "views")
});

router.get("/", async (req, res) => {
  const searchTask = await Task.find();
  res.render("index", { title: "TaskManager", Task: searchTask });
});
router.post("/", async (req, res) => {
  switch (req.body.sort) {
    case "first":
      const searchTaskFirst = await Task.find({ priority: "First" });
      res.json({ arr: searchTaskFirst });
      break;
    case "second":
      const searchTaskSecond = await Task.find({ priority: "Second" });
      res.json({ arr: searchTaskSecond });
      break;
    case "third":
      const searchTaskThird = await Task.find({ priority: "Third" });
      res.json({ arr: searchTaskThird });
      break;
    default:
      const searchTask = await Task.find();
      res.json({ arr: searchTask });
  }
});

router.post("/new", async (req, res) => {
  const json = await JSON.parse(req.body.payload);
  console.log(json.message);
});

router.get("/alltasks", async (req, res) => {
  res.redirect("/");
});

router.get("/endtasks", async (req, res) => {
  const searchTask = await Task.find({ status: "end" });
  res.render("index", { title: "endTask", Task: searchTask });
});

router.get("/activetasks", async (req, res) => {
  const searchTask = await Task.find({ status: "active" });
  res.render("index", { title: "activeTask", Task: searchTask });
});

router.get("/inactivetasks", async (req, res) => {
  const searchTask = await Task.find({ status: "inactive" });
  res.render("index", { title: "inactiveTask", Task: searchTask });
});

router.get("/:id", async (req, res) => {
  const searchTask = await Task.find({ _id: req.params.id });
  res.render("card", { title: "TaskManager", Task: searchTask });
});
router.post("/:id", async (req, res) => {
  const searchTask = await Task.updateOne(
    { _id: req.params.id },
    { $set: { executor: req.body.name, status: "active" } }
  );
  res.redirect("/");
});

module.exports = router;
