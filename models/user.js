const mongoose=require('mongoose');
//extending functionality of mongoose for user management with passport local moongoose
const plm=require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema=new mongoose.Schema({
    username:{
        type:String
    },
    userRole:{
        type:String
    },
    password:{
        type:String
    },
    oauthProvider: {
        type:String
    },
    oauthId: {
        type: String
    }
})

//extending functionallity with plm

userSchema.plugin(plm);
userSchema.plugin(findOrCreate);

module.exports=mongoose.model('User',userSchema);