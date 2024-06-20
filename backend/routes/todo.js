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
        title:req.body.title,
    })
    console.log(existingTODO);
    if(existingTODO){
        return res.status(409).json({
            msg:"TODO exist ",
            msg2:false,
        })
    }
    const newTODO = await TODO.create({
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

todoRoute.get("/allTodos",middleware,async(req,res)=>{
    try {
        const allTodos = await TODO.find({});
        res.status(200).json(allTodos);
    } catch (error) {
        console.error('Error retrieving all todos:', error);
        res.status(500).json({ message: 'Internal server error BE' });
    }
})

module.exports = todoRoute;
