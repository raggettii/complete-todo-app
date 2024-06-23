const express = require("express");
const todoRoute = express.Router();
const   {todoSchema} = require ("../zod/index"); 
const  {User ,TODO,CompletedTodo} =require( "../db/index");
const   middleware =require ("../middlewares/index");


todoRoute.post("/createtodo",middleware,async(req,res)=>{
    const {success} = todoSchema.safeParse(req.body);
    if(!success){
        return res.status(404).json({
            msg:"Invailid data"
        })
    }
    try{
    const existingTODO = await TODO.findOne({
        username:req.body.username,
        title:req.body.title,
    })
    console.log(existingTODO);
    if(existingTODO){
        console.log("Hello")
        return res.status(200).json({
            msg:"TODO exist ",
            msg2:false,
        })
    }
    const newTODO = await TODO.create({
        username:req.body.username,
        title:req.body.title,
        description:req.body.description,
    })
    return res.status(200).json({
        msg:"Todo created Successfully ",
        msg2:true,
    })
}catch(error){
    console.error("Error while creating todo",error);
}
})


todoRoute.post("/markAsDone", middleware, async (req, res) => {
    try {
      const { title, username } = req.body;
      await TODO.deleteOne({ title, username });
      await CompletedTodo.create({ username, title });
      res.status(200).json({
        msg: `Todo marked as done and moved to completed todos: ${title}`,
      });
    } catch (error) {
      console.error("Error marking as done:", error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
//  i can also do that here just use a bool variable 
// inside todo db and mark completed one as true 
// then render completed ones 
todoRoute.get("/completedTodo", middleware, async (req, res) => {
    try {
      const username = req.query.username; // Retrieve from query parameters
      const compTodos = await CompletedTodo.find({ username });
      res.status(200).json(compTodos);
    } catch (error) {
      console.error('Error retrieving completed todos:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

todoRoute.get("/allTodos", middleware, async (req, res) => {
    try {
      const username = req.headers.username;
      const allTodos = await TODO.find({ username });
      res.status(200).json(allTodos);
    } catch (error) {
      console.error('Error retrieving all todos:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

module.exports = todoRoute;
