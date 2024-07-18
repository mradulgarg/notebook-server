const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{type:String, require:true},
    email:{type:String, require:true, unique:true},
    password:{type:String, require:true},
    gender:{type:String, require:true},
    number:{type:Number, require:true},
},{
    versionKey:false
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;