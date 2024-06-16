const express = require("express");
const port = 3000;
const app =express();
const cors  = require("cors");
const rootRouter = require("./routes/index");
app.use(cors());
app.use(express.json());
app.use("/api/v1",rootRouter);


// The app.listen method in Express does not return 
// a promise; therefore, it does not support chaining
//  .then() directly. Instead, it uses a callback to execute
//  code once the server starts listening 
app.listen(port, () => {
    console.log(`Server started running on port ${port}`);
  });