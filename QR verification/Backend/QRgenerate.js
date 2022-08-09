const express = require("express");
const app = express();
const mongoose = require("mongoose");
const sha256=require("sha256");
const Order=require('./orderSchema');

const router=express.Router();

router.post("/generate",async(req,res)=>{

    console.log("success connect");

    const {order_id,email}=req.body;
    const image="https://drive.google.com/file/d/1HbYniPxlnhHazhTNx150CcxJk3CDURya/view?usp=sharing"
    console.log(req.body);
    const hash=sha256(order_id);
    console.log("success connect");
    const order= new Order({
        order_id:order_id,
        email:email,
        hash:hash,
        image:image
    })

    order.save().then(()=>{
        console.log("saved to db");
    })
    res.json({"success":true,data:hash});

})


router.post("/verify",async(req,res)=>{
    const {hashh}=req.body;
    console.log(req.body);

    // const data=await Order.findOne({hash:hash});

    Order.findOne({hash:hashh},(error,data)=>{
        if(data)
        {
            console.log("successful")
            console.log(data);
            res.json({"success":true,message:"Verified Successfully!!",data:data});
        }
        else
        {
            console.log(data);
            res.json({"success":false,message:"Not found!"});
        }
    })
})
module.exports=router;

