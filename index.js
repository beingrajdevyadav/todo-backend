import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { configDotenv } from "dotenv";

// dot env config
configDotenv();

// app creation using expressjs
const app = express();
app.use(cors());
app.use(express.json());


// connect to mongodb

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected."))
    .catch((err) => console.log("MongoDB Conn Error : ", err));


//  Mongoose Schema 
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Todo = mongoose.model("Todo", todoSchema);



// CRUD Endpoints
app.get("/", (req ,res)=>{
    res.json({message: "API Ok"});
})
// CREATE
app.post("/todos", async (req, res) => {
    try {
        const todo = await Todo.create({ title: req.body.title });
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
});


// READ ALL
app.get("/todos", async(req , res)=>{
    const todos = await Todo.find().sort({createdAt: -1});
    res.json(todos);
});


// READ one - by todo id
app.get("/todos/:id", async(req, res)=>{
    try {
        const todo = await Todo.findById(req.params.id);
        if(!todo) return res.status(404).json({message:"Todo not found"});

        res.json(todo);
    } catch (error) {
      res.status(400).json({message: "Invalid Id"});  
    }
});

// UPDATE
app.put("/todos/:id", async(req, res)=>{
    try {
        const todo =await Todo.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            }, 
            {
                new: true, runValidators: true
            }
        );

        if(!todo) return res.status(404).json({message: "Todo not found"});

        res.json(todo);
    } catch (error) {
        res.status(400).json({message:err.message});
    }
});


// DELETE

app.delete("/todos/:id", async(req , res)=>{
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if(!todo) return res.status(404).json({message: "todo not found"});

        res.json({deleted: todo._id});
    } catch (error) {
       res.status(400).json({message: "Invalid ID"}) ;
    }
})


// Start server
app.listen(process.env.PORT, ()=>{
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
});




