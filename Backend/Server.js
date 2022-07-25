const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors=require('cors');
const bodyParser = require('body-parser');
const cookieparser= require('cookie-parser');


mongoose.connect("mongodb+srv://verichain:helloverichain123@main.ehj4f.mongodb.net/verichain_database?retryWrites=true&w=majority",{useUnifiedTopology: true},(err,client)=>{
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
var corseoptions={credentials:true}

app.use(cors(corseoptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true,
}));
app.use(cookieparser());



app.listen(5005,()=>{

    console.log("backend is running");

})