const mongoose = require("mongoose");
const Task = require("./models/tuskSchema");
const uri =
  "mongodb+srv://Krull:101963@projectone-ppc6j.mongodb.net/test?retryWrites=true&w=majority";

async function seed() {
  mongoose.connect(uri, { useNewUrlParser: true });
  const savedb = new Task({
    taskName: "reboot",
    taskDescription:
      "any  word word word word word word word word word word word word word word word word ",
    priority: "Third"
  });
  await savedb.save();

  console.log("nice");
  mongoose.connection.close();
}

seed();
