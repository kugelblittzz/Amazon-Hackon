import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link,useNavigate,Redirect   } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import QRCode from "react-qr-code";
import QrReader from 'react-qr-reader-es6'

const QRpage=()=>{
    const [code,setCode]=useState("");
    const [q,setQ]=useState("");
    let navigate=useNavigate();

    const Link=()=>{
        navigate("/verify");
      }


    const Scan=(da)=>{
        if(da)
        {
            setQ(da);
        }
    }

    const Generate=async()=>{


        
        var order_id=document.getElementById('name').value;
        var email=document.getElementById('email').value;
        console.log(order_id);
        console.log(email);
        

       await axios.post('/api/generate/',{
            order_id:order_id,
            email:email
        }).then((res)=>{
            var data=res.data.data;
            console.log(data);
            setCode(data);
            document.getElementById('qr').style.visibility="visible";
        })
    }

    return(
        <section className="main position-absolute" style={{backgroundColor:"#16324F",width:"100%", height:"100vh", overflowY:"scroll"}}>
        <nav className="navbar navbar-dark"style={{backgroundColor:"#16324F"}}>
          <div className="container-fluid justify-content-center position-relative">
          <div onClick={Link} className="btn position-absolute signin text-white"  style={{borderRadius:"30px",fontSize:"1.5rem",borderBottom:"solid",borderColor:"#3E92CC",left:"3%",fontWeight:"bolder"}}>Verify QR</div>
            <a className="navbar-brand" href="#"><p className="head" style={{fontWeight:"bolder",fontSize:"2.0rem",borderBottom:"solid",borderColor:"#3E92CC",borderWidth:"thick"}}>Generate QR</p></a>
            
          </div>
        </nav>
  
       
        <div className="how position-relative d-md-flex flex-md-row flex-md-wrap justify-content-md-around my-5 py-5"style={{alignContent:"center"}}>
       
         

          <div className="outer  p-2" style={{backgroundColor:"#16324F",width:"40%",maxHeight:"40%",borderRadius:"20px", borderStyle:"solid",borderColor:"white",borderWidth:"medium"}}>
                <div className="inner position-relative d-flex d-flex-column justify-content-center pt-3 pb-3 align-items-center d-flex" style={{backgroundColor:"white",width:"100%",height:"100%",borderRadius:"20px"}}>
                
                <div className="id position-relative px-3" style={{width:"60%"}}>
                <p className="id" style={{fontWeight:"bolder", fontSize:"2.0rem"}}>Email Id:</p>
                    <input className="form-control px-2 py-3 " id="email" style={{width:"100%"}} type="text" placeholder="Email Id" aria-label="default input example"></input>
                    <p className="id" style={{fontWeight:"bolder", fontSize:"2.0rem"}}>Order Id:</p>
                    <input className="form-control px-2 py-3 " id="name" style={{width:"100%"}} type="text" placeholder="Order Id" aria-label="default input example"></input>


                    <div className="btn btn-md mt-3 text-white" onClick={Generate} style={{backgroundColor:"#2A628F",borderRadius:"30px",fontSize:"1.5rem"}}>Generate</div>

                </div>
            </div>
        </div>

       

       
         
  
        </div>
        <p className="code text-white" style={{fontSize:"2rem"}}>Unique Code:</p>
        <p className="code text-white">{code}</p>

        <QRCode id="qr" style={{visibility:"hidden"}} value={code} />



  
  
    
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
  
  
  
      </section>
    );
}


export default QRpage;