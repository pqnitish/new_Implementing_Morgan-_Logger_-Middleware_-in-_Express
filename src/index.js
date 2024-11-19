const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const PORT = 3005;

const app = express();
// middleware to parse JSON bodies
app.use(express.json());
// create a write stream for logging
const logStream = fs.createWriteStream(path.join(__dirname,"access.log"),{flags:"a"});
// custom format for morgan logs
const logFormat = ":method :url :http-version :status :res[content-length] - :response-time ms [:date[iso]]";
// Integrate Morgan Logger Middleware
app.use(morgan(logFormat,{stream:logStream}));
// Routes
app.get("/",(req,res)=>{
    res.status(200).send("Welcome to the Express Server!");

});
app.get("/get-users",(req,res)=>{
    res.status(200).json({message:"List of users"});
});
app.post("/add-user",(req,res)=>{
    res.status(201).json({message:"User added successfully"});
});
app.put("/user/:id",(req,res)=>{
    const {id} = req.params;
    res.status(201).json({message:`User with ID ${id} updated successfully!`});
});
app.delete("/user/:id",(req,res)=>{
    const {id} = req.params;
    res.status(200).json({message:`User with ID ${id} deleted successfully!`});
})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
