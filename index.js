const express=require('express');
const app=express();
const userRoute=require('./routes/userroute');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
app.use("/user", userRoute);

app.listen(3000, ()=>{
    console.log('server listening');
});