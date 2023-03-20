const mongoose=require('mongoose');
//extending functionality of mongoose for user management with passport local moongoose
const plm=require('passport-local-mongoose');

const userSchema=new mongoose.Schema({
    usename:{
        type:String
    },
    password:{
        type:String
    }
})

//extending functionallity with plm

userSchema.plugin(plm)

module.exports=mongoose.model('User',userSchema);