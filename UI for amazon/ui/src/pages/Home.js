import React from "react";
import "./Home.css";
import Product from "./Product";

import "./Header.css";
import "./Product.css"
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import {useEffect, useState} from "react";

const TodosContext = React.createContext({
  todos: [], fetchTodos: () => {}
})


function Home() {

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

      <form
      id="frmUploader"
      enctype="multipart/form-data"
      action="/upload"
      method="post"

      class=" pd-3"
    >
      <input type="file" name="image" multiple />

      <div class="uploadd">
        <input class="btn pt-3 btn-md btn-primary btn-lg" type="submit" name="submit" id="btnSubmit" value="Upload" />
      </div>
      </form>
        {/*s<button>Add to Basket</button> */}
    </div>

    






    </div>
  );
}

export default Home;
