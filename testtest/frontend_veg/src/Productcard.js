import React from "react";
import {Link, Route, Routes} from 'react-router-dom'
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
import Title from "./Title.js"
import QuantityBtn from "./QuantityBtn.js"
import axios from "axios";
// import express from "express"
// 對照 ProductList.js
// $(function() {
//   // This button will increment the value
//   $('.qtyplus').click(function(e) {
//     // Stop acting like a button
//     e.preventDefault();
//     // Get the field name
//     var fieldName = $(this).attr('field');
//     // Get its current value
//     var currentVal = parseInt($('input[name=' + fieldName + ']').val());
//     // If is not undefined
//     if (!isNaN(currentVal)) {
//       // Increment
//       $('input[name=' + fieldName + ']').val(currentVal + 1);
//     } else {
//       // Otherwise put a 0 there
//       $('input[name=' + fieldName + ']').val(0);
//     }
//   });
//   // This button will decrement the value till 0
//   $(".qtyminus").click(function(e) {
//     // Stop acting like a button
//     e.preventDefault();
//     // Get the field name
//     var fieldName = $(this).attr('field');
//     // Get its current value
//     var currentVal = parseInt($('input[name=' + fieldName + ']').val());
//     // If it isn't undefined or its greater than 0
//     if (!isNaN(currentVal) && currentVal > 0) {
//       // Decrement one
//       $('input[name=' + fieldName + ']').val(currentVal - 1);
//     } else {
//       // Otherwise put a 0 there
//       $('input[name=' + fieldName + ']').val(0);
//     }
//   });
// });



export default function Productcard(){
    const [toggle, setToggle] = useState(false);
    // - 數量 +
    // const transitions = useTransition(toggle, {
    //   from: { opacity: 0 },
    //   enter: { opacity: 1 },
    //   leave: { opacity: 0 },
    // }); 
    let [productcard, setProductcard] = useState([])
    let [input , setInput] = useState('') 
    useEffect(()=>{

      //1 : 無第二個參數 : component每次render都會觸發
      //2 : Dependency Array是空array時 : 只會在第一次網頁render時會觸發
      //3 : Dependency Array是有變數時 : 第一次網頁render時 + 指定的變數改變 會觸發
      // fetch('http://127.0.0.1:5500/src/react-basic-product.json')
      //     .then(response => response.json())
      //     .then(data => setProductcard(data))
      axios.get('https://localhost:8000/products',{
          //URL参數放在params屬性裏面
          params: {
              name: "蘋果",
              price: 5,
              image: "apple.jpg",
              description: "新鮮蘋果50克，一日一蘋果，醫生遠離我"
          }
      })
      .then((response) => console.log(response))
      .then(response => response.json())
      .then(data => setProductcard(data))
      .catch((error) => console.log(error))     
      console.log(productcard)
    },[]) // <==  Dependency Array
    // - 數量 + end

    const [click, setClick] = useState(false);
    const [image, setImage] = useState("/static/media/trolley(2).96c73cb49987ccdf1154.png");
    const style = {
        height: "20px",
        width: "20px",
    };
    useEffect(() => {
      // setClick(true);
      
      if (click === true) {
        // click = !click;
        setTimeout(() => {
          if (click === true) {
            setImage("/static/media/trolley (1).e26818c0ffe739d3f9e1.png");
          }
        }, 1000);
      }else{
        setTimeout(() => {
          if (click === false) {
            setImage("/static/media/trolley(2).96c73cb49987ccdf1154.png");
          }
        }, 1000);
      }

    }, [click, setClick, setImage]);


    const [cl, setCl] = useState(false);
    const [img, setImg] = useState("/static/media/heart (1).c412cbaead4744166c20.png");
    useEffect(() => {
      // setClick(true);
      
      if (cl === true) {
        // click = !click;
        setTimeout(() => {
          if (cl === true) {
            setImg("/static/media/heart(2).556c78a5a9b89d6b2eeb.png");
          }
        }, 1000);
      }else{
        setTimeout(() => {
          if (cl === false) {
            setImg("/static/media/heart (1).c412cbaead4744166c20.png");
          }
        }, 1000);
      }

    }, [cl, setCl, setImg]);
    return(
      <div className="all">
      <Title mainTitle="請選擇要購買的水果" />
      <div className=" productlist">
        
            
            {/* <img class="card-img-top" src={mango} alt="Card image cap"/> */}
            
                {
                    productcard.map(product=>(
                    <div class="card"  id="aa">
                      <div class="card-body">
                        <div id='myform' className="myform">
                        <div key={product.id}>
                            <h5 class="card-title">{product.name}</h5>
                            <p class="card-text">{product.price}元/件</p>
                            <Link to={'/product/'+product.id}>
                              <img className="img-card" src={'http://127.0.0.1:5500/src/img/'+product.image} alt={product.name} />
                            </Link>
                            <br/>
                            {product.description}<br/>
                            <QuantityBtn productInfo={product} />
                            
                        </div>
                        </div>
                      </div>
                    </div>
                    ))
                }
                
            
            {/* <div class="card-body">
                <h5 class="card-title">愛文芒果</h5> */}
                {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                {/* <form id='myform' method='POST' action='#' className="myform">
                    <input type='button' value='-' class='qtyminus' field='quantity' />
                    <input type='text' name='quantity' value='0' class='qty' />
                    <input type='button' value='+' class='qtyplus' field='quantity' />
                    <p className="prodlabel">/斤/OO元</p>
                    <a href="#" class="btn btn-card 1_t" onClick={e => {setClick(!click);}}><img className="trolley_card" id="trolley_card" alt="Trolley" src={image} style={style}/></a>
                    <a href="#" class="btn btn-card 1_h" onClick={e => {setCl(!cl);}}><img className="heart_card" alt="heart" src={img} /></a>
                </form> */}
                      
                      
             </div>         
             </div>
    )
}