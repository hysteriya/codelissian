const express= require('express');
const userRoute= express.Router();
const {login, signup, userFunc, getUser, updateUser, deleteUser}=require('../controller/usercontroller');


userRoute
.route('/signup')
.post(signup);


userRoute
.route('/login')
.post(login);

userRoute.use(userFunc)
userRoute
.route('/profile')
.get(getUser)
.patch(updateUser)
.delete(deleteUser);



module.exports=userRoute;

