const  z =require( "zod");

const signUpSchema = z.object({
    firstName:z.string().nonempty({message:"FirstName is required"}),
    lastName:z.string().nonempty({message:"LastName is required"}),
    username:z.string().nonempty({message:"password is required"}),
    email:z.string().email({message:"Invalid Email Format"}),
    password:z.string(),
});

const signInSchema = z.object({
    username:z.string().nonempty({message:"password is required"}),
    password:z.string(),
});

const todoSchema = z.object({
    title:z.string().nonempty({message:"Title is required"}),
    description:z.string(),
})

module.exports =  {signInSchema,signUpSchema ,todoSchema};