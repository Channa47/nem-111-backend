const express = require("express");
const {Router} = require('express');
const NoteModel= require("../Models/noteModel")
const jwt = require("jsonwebtoken");
const noteRouter = Router();

noteRouter.get("/",async(req,res)=>{
    let token = req.headers.authorization; 
    try{

        // const decode = jwt.verify(token,"channa")
        // if(decode){
        //     const userID = decode.userID;
        //     const data = await NoteModel.find({userID:userID});
        //     res.send(data)
        // }else{
        //     res.send([]);
        // }
        const data = await NoteModel.find();
        res.send(data);
    }catch(e){
        res.send(e)
    }
});

noteRouter.post("/post",async(req,res)=>{
    const payload = req.body;
    try{
        const newNote = new NoteModel(payload);
        await newNote.save();
        res.send("Done")
    }catch(e){
        res.send({"msg":e});
    }
});

noteRouter.patch("/update/:id",async(req,res)=>{
    let id = req.params.id
    const payload = req.body;
    const note = await NoteModel.findById(id);
    const userId_in_note = note.userID;
    const userIdOfMakingRequest = req.body.userID;
     try{
         if(userIdOfMakingRequest !== userId_in_note){
            res.send({msg:"Not AUtyhoridsed by new id Thing"});
         }else{
            const Updated =  await NoteModel.findByIdAndUpdate({_id:id},{...payload});
            const up = await NoteModel.findById(id);
            res.send({msg:"Done"})
         }
     }catch(e){
        res.send(e);
     }
});

noteRouter.delete("/del/:id",async(req,res)=>{
    let id = req.params.id;
    const note = await NoteModel.findById(id);
    const userId_in_note = note.userID;
    const userIdOfMakingRequest = req.body.userID;
    try{
        if(userIdOfMakingRequest !== userId_in_note){
           res.send({msg:"notAuth"})
        }else{
            await NoteModel.findByIdAndDelete(id);
            res.send({msg:"deleted"})
        }
        
    }catch(e){
        res.send(e)
    }
});

module.exports = noteRouter;
