require("dotenv").config()

const express = require("express")

const next = require("next")

const port = process.env.PORT || 3000

const dev = process.env.NODE_ENV !== 'production'

const nextApp = next({dev})

const nextHandle = nextApp.getRequestHandler()


nextApp.prepare().then(()=>{
    const expressApp = express();

    const bodyParser = require("body-parser");

    expressApp.use(bodyParser.urlencoded({extended: false}))

    // db
    const mongoose = require("mongoose")

    mongoose.connect(process.env.MONGODB_URI);

    // model
    const noteSchema = new mongoose.Schema({title: String, body: String, date: String});
    const Note = mongoose.model("Note", noteSchema);

    // getting notes
    expressApp.get("/notes", (req, res)=>{
        Note.find({}, (err, docs)=>{
            res.json(docs);
        })

    })

    // add a new note to database
    expressApp.post("/note", (req, res)=>{
        // if(req.title)
        // const newNote = Note()
    })


    expressApp.all("*", (req, res)=>{
        return nextHandle(req, res);
    })


    expressApp.listen(port, ()=>{
        console.log("server live on port", port)
    })
})