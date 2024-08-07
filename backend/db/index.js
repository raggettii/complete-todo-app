const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URL);
{
  try {
    () => {
      console.log("DataBaseConnected");
    };
  } catch (err) {
    console.error("Error while connecting to DB", err);
  }
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    lowercase: true,
    minLength: 6,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

const todoSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "None",
  },
});

const completedTODO = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const TODO = mongoose.model("TODO", todoSchema);
const CompletedTodo = mongoose.model("CompletedTodo", completedTODO);

module.exports = {
  User,
  TODO,
  CompletedTodo,
};
