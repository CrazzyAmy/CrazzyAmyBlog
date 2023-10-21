import React from "react";
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import trolley from "./img/trolley-1-1.png";
import "./Productstyle.css";
import mango from "./img/mango.jpeg"
import heart1 from "./img/heart (1).png"
import heart2 from "./img/heart(2).png"
import trolley1 from "./img/trolley (1).png"
import trolley2 from "./img/trolley(2).png"
import { useTransition, animated, useSpring } from '@react-spring/web'
import { useEffect , useState} from 'react'
import $ from 'jquery';
import Productcard from "./Productcard.js";



import Checkout from './Checkout.js';
// import ProductDetail from './ProductDetail.js';
import ProductList from './ProductList.js';
import {CartContext} from './CartContext.js'
// import image1 from "https://media.istockphoto.com/id/1338944531/vector/vector-illustration-of-discount-tag-15-percent-off-hangtags-sale-vector-illustration.jpg?s=1024x1024&w=is&k=20&c=Ssg-A_PbMSVU-mxibrr_CLKIt-IcV7B2ku90G8BIMwI="
// const {useState} = React



// $(function()
//   {   
    
    // $('.1_h').click(function(e) {
    //   // Stop acting like a button
    //   e.preventDefault();
      
    //   var inputs = document.myform;
    //   for(var i = 0; i < inputs.length; i++) {
    //       inputs[i].disabled = false;
    //   }
    //   var edit_save = document.getElementById("trolley_card");

    //    edit_save.src = "../template/save.png";
    //   if(edit_save==={trolley1}){
    //     edit_save.src={trolley2};
    //   }else{
    //     edit_save.src={trolley1};
    //   }
      
    // });
  // })
function Product(){
  
    return(
    <div className="product" id="product">
      <div className="div">
        <div class="header">{/* navbar */}
            <div class="logo1 align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                <Link to={"/"}>蔬菜盒子</Link>
            </div>
            <ul class="menu">
                <li><Link to={"/payment"} href="#" class="dropdown a1">訂單資訊</Link>
                    <ul class="dropdown-open">
                        <li><Link to={"/payment"} href="#">出貨進度</Link></li>
                        <li><Link to={"/payment"} href="#">退貨申請</Link></li>
                        <li><Link to={"/payment"} href="#">退貨進度</Link></li>
                    </ul>
                </li>
                <li><Link to={"/product"} className="a1" href="#">產品</Link></li>
                <li><Link to={"/checkout"} className="a2"><img className="trolley" alt="Trolley" src={trolley} /></Link></li>
                {/*  class="nav-item" */}
            </ul>
        </div>
        <div className="row con">
          <div className="col-3 leftbar">
            {/* <div className="text-wrapper-28">我的帳戶</div> */}
            <div className="text-wrapper-25">當季食蔬</div>
            <div className="text-wrapper-15">蔬菜</div>
            <div className="text-wrapper-16">水果</div>
            <div className="text-wrapper-17">蔬菜盒子</div>
          </div>
          <div className="col-8  mainbar">
            {/* <div className="infor"> */}
              <div class="box">
                  <div class="container-4">
                      <input type="search" id="search" placeholder="Search..." />
                      <button class="icon"><i class="fa fa-search"></i></button>
                  </div>
              </div>
              {/* <div className="row"> */}

              {/* <div className=" productlist"> */}
                <Productcard />
              {/* </div> */}


                {/* <div className="col-4 infoRR">
                  <div className="text-wrapper-29">近期訂單</div>
                  <div className="text-wrapper-30">近期無新訂單</div>
                </div> */}
            {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
    );

  // );

};

export default Product;
