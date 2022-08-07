import React from "react";
import "./Home.css";
import Product from "./Product";

import "./Header.css";
import "./Product.css"
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import {useEffect, useState} from "react";
import axios from "axios";

const TodosContext = React.createContext({
  todos: [], fetchTodos: () => {}
})


function Home() {

  const [datas,setData]=useState(null);



  const test=async()=>{
    console.log(document.getElementById("image").files[0]);
    var data=document.getElementById("image").files[0];
    const formData = new FormData();
    formData.append("file",data);
    console.log(formData);
    document.getElementById("testing").src="data";
    await axios.post("/img",formData,
    {
      headers:{
        'Accept': 'application/json',
        'Content-Type':"image/jpeg",
        'type':"image/jpeg"
      }
    }
    ).then((res)=>{
      console.log(res.data);
      var rawResponse = res.data; // truncated for example

// convert to Base64
// var b64Response = btoa(unescape(encodeURIComponent(rawResponse)))

// console.log(b64Response)



var outputImg = document.getElementById("result");
setData(res.data);


outputImg.src = 'data:image/jpeg;base64,'+res.data;

// append it to your page

    })
  }



  return (
    <div>
    <div className="header">
      <img
        className="header__logo"
        src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
      />

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <div className="header__option">
          <span className="header__optionLineOne">Hello Guest</span>
          <span className="header__optionLineTwo">Sign In</span>
        </div>

        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        
        <div className="header__optionBasket">
          <ShoppingBasketIcon />
          <span className="header__optionLineTwo header__basketCount">0</span>
        </div>
      </div>
    </div>

    <div>
      
    </div>


    <div className="product">
      <div className="product__info">
        <p>NIKE SHOES</p>
        <p className="product__price">
          <small>$</small>
          <strong>500</strong>
        </p>
        
      </div>

      <img src="https://media.gq-magazine.co.uk/photos/621cba0079d681bd2cc22f59/master/w_800%2Cc_limit/24022022_A_06.jpeg" alt="" />

      
      <input id="image" className="form-control"  type="file" name="image" accept="image/jpeg"/>

      <input id="testing" className="form-control" src="" type="image/jpeg" name="image" accept="image/jpeg"/>

      <div class="uploadd">
        {/* <input class="btn pt-3 btn-md btn-primary btn-lg" type="submit" name="submit" id="btnSubmit" value="Upload" /> */}


        
      </div>
      
        {/*s<button>Add to Basket</button> */}
    </div>

    


    <button onClick={test}>sdfasd
        </button>
        


        <img src ="" id="result" />





    </div>
  );
}

export default Home;
