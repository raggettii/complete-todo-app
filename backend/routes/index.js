const express = require("express");

const rootRouter = express.Router();
const userRouter = require("./user");
const todoRouter = require("./todo");

rootRouter.use("/user",userRouter);
rootRouter.use("/todo",todoRouter);
module.exports = rootRouter;
