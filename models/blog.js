const {Router}=require('express');
const mongoose=require('mongoose');

const blogSchema=new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    }
})

module.exports=mongoose.model('blog',blogSchema);