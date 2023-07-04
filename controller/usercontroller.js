const userModel=require("../model/usermodel");
var jwt= require("jsonwebtoken");
//stored in  a diiferent file
const JWT_KEY='salt';

module.exports.signup=async function(req,res){
    try{
        let data=req.body;
        let user=await userModel.create(data);
        if (user){
            res.json({
                msg: "user signed up"
            });
        }
        else{
            res.json({msg: "user could not be signed up"});
        }
        
    }
    catch (err) {
        res.json({err: err.message});
        console.log(err);
      }
}

module.exports.login= async function(req, res){
    try{
        let {name, password}= req.body;
        let user= await userModel.findOne({name: name});
        if (user){
            if (password==user.password){
                let uid=user["_id"];
                var token=jwt.sign({payload:uid}, JWT_KEY);
                res.cookie("login", token);
                res.json({msg: "user logged in"});
            }
            else{
                res.json({msg: "password incorrect"});
            }

        }
        else{
            res.json({msg: "user not found"});
        }
    }
    catch (err) {
        res.json({err: err.message});
    }
}

//before one can read, update or delete
module.exports.userFunc= async function(req, res, next){
    let token;
    if (req.cookies.login){
        token= req.cookies.login;
        let payloadObj= jwt.verify(token, JWT_KEY);
        const user=await userModel.findById(payloadObj.payload);
        req.id=user.id;
        req.role=user.role;
        if (payloadObj){
            next();
        }
        else{
            res.json({msg: "please login first"});
        }
    }
}

module.exports.getUser= async function(req, res){
    try{
        let id=req.id;
        let user=await userModel.findById(id);
        res.json({msg:"user retrieved", user});
    }
    catch(err){
        res.json({msg:err.message});
    }
}

module.exports.updateUser= async function(req, res){
    let id=req.id;
    let user= await userModel.findById(id);
    let dataToBeUpdated= req.body;
    try{
        if (user){
            const keys=[];
            for(let key in dataToBeUpdated){
                keys.push(key);
            }
            for (let i=0; i< keys.length; i++){
                user[keys[i]]=dataToBeUpdated[keys[i]];
            }
            const updatedData= await user.save();
            res.json({msg: "user data updated", updatedData});
        }
        else{
            res.json({message:"user not found"});
        }
    }
    catch (err) {
        res.json({err: err.message});
    }
}

module.exports.deleteUser = async function (req, res) {
    try {
      let id = req.id;
      let user = await userModel.findByIdAndDelete(id);
      res.json({msg: "user has been deleted", user});
    } catch (err) {
      res.json({msg: err.message,});
    }
  };

