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
  console.log(req.body.payload.message);
  console.log(req.body.payload[0].message);
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

{"type":"message_action",
"token":"38A6DzexG3ugR9LOGfVKGChI",
"action_ts":"1568977765.902853",
"team":{
  "id":"TNGMJFP96","domain":"taskjs"
},
  "user":{
    "id":"UN57LGWMR",
  "name":"9_panfilov_8"
},
  "channel":{
    "id":"DNGMJG76C",
  "name":"directmessage"
},
  "callback_id":"subbmit",
  "trigger_id":"769270005175.764732533312.259c621cd098a4741507b217219fd97f",
  "message_ts":"1568977233.001700",
  "message":{
    "client_msg_id":"3d0ea47d-f15f-4df2-98d8-92e222ae67fe",
    "type":"message",
    "text":"ned reboot",
    "user":"UN57LGWMR",
    "ts":"1568977233.001700",
    "team":"TNGMJFP96"
  },
  "response_url":"https:\/\/hooks.slack.com\/app\/TNGMJFP96\/766948264356\/dGTJWce9rY91vqQgTjOXRREj"}
