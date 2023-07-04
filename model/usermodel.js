const mongoose=require('mongoose');

//stored in a different file
const dbLink='mongodb+srv://admin0:tJnFqlIQudVhNePH@cluster0.xjvjtrn.mongodb.net/?retryWrites=true&w=majority'

mongoose
.connect(dbLink)
.then(function (db){
    console.log('userDb connected');
})
.catch(function (err){
    console.log(err);
});

const userSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:["admin", "user"],
        default:"user"
    },
    password:{
        type:String,
        minLength:4
    },
    resetToken:{type:String}
});

const userModel=mongoose.model("userModel", userSchema);
module.exports=userModel;



