const express = require("express");
const todoRoute = express.Router();
const   {todoSchema} = require ("../zod/index"); 
const  {User ,TODO,CompletedTodo} =require( "../db/index");
const   middleware =require ("../middlewares/index");


todoRoute.post("/createtodo",middleware,async(req,res)=>{
    const {success} = todoSchema.safeParse(req.body);

    if(!success){
        res.status(404).json({
            msg:"Invailid data"
        })
    }
    try{
    const existingTODO = await TODO.findOne({
        title:req.body.title,
    })
    if(existingTODO){
        res.status(411).json({
            msg:"TODO exist ",
        })
    }
    const newTODO = await TODO.create({
        title:req.body.title,
        description:req.body.description,
    })
    res.status(200).json({
        msg:"Todo created Successfully ",
    })
}catch{
    console.error("Error while creating todo",error);
}
})


todoRoute.post("/markAsDone",middleware,async(req,res)=>{
    try{
    const doneTodo = req.body.title;
    await TODO.deleteOne({title:doneTodo});
    await CompletedTodo.create({
        title:doneTodo,
    })
    res.status(200).json({
        msg:`Todo marked as done and moved to completed todos ie.${doneTodo}`,
    })
}
    catch(error){
        console.error("Error Encountered" , error);
    }
})

//  i can also do that here just use a bool variable 
// inside todo db and mark completed one as true 
// then render completed ones 
todoRoute.get("/completedTodo",middleware,async(req,res)=>{
    try {
        const compTodos = await CompletedTodo.find({});
        res.status(200).json(compTodos);
    } catch (error) {
        console.error('Error retrieving completed todos:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = todoRoute;
