const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors=require('cors');
const bodyParser = require('body-parser');
const cookieparser= require('cookie-parser');
const QRgenerate=require('./QRgenerate');


mongoose.connect("mongodb://0.0.0.0:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",{useUnifiedTopology: true},(err,client)=>{
    if(!err)
    {
        console.log("connection to database successfull")

    }
    else{
        console.log(err);
        console.log("error connecting to database")
    }
}
);


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true,
}));

app.use(cookieparser());

app.use("/api",QRgenerate);



app.listen(5005,()=>{

    console.log("backend is running");

})