import { useRef, useContext, useState, useEffect } from "react"
import  CartContext  from "./CartContext.js"
import React from "react";
import {Link, Route, Routes} from 'react-router-dom'
import trolley from "./img/trolley-1-1.png";
// import "./Productstyle.css";
import mango from "./img/mango.jpeg"
import heart1 from "./img/heart (1).png"
import heart2 from "./img/heart(2).png"
import trolley1 from "./img/trolley (1).png"
import trolley2 from "./img/trolley(2).png"
import { useTransition, animated, useSpring } from '@react-spring/web'
import Title from "./Title.js"
import "./Productstyle.css";
export default function Quantity({productInfo}) {
    const listRef = useRef<HTMLUListElement | null>(null);
    listRef.current?.lastElementChild?.scrollIntoView();
// 固定高度
    // const [screenSize, getDimension] = useState({
    //     dynamicWidth: window.innerWidth,
    //     dynamicHeight: window.innerHeight
    //   });
    //   const setDimension = () => {
    //     getDimension({
    //       dynamicWidth: window.innerWidth,
    //       dynamicHeight: window.innerHeight
    //     })
    //   }
      
    //   useEffect(() => {
    //     window.addEventListener('resize', setDimension);
        
    //     return(() => {
    //         window.removeEventListener('resize', setDimension);
    //     })
    //   }, [screenSize])
      
// 設定產品資訊
    const [CartArray, setCartArray] = useState(CartContext);
    const {cartItems, setCartItems} = useContext(CartContext)

    //購物車內有冇該產品
    let productIndexInCart = cartItems.findIndex((element)=>{
        return element.id === productInfo.id
    })
    //findIndex()
    //如果係購物車內找到該件產品 => 返回索引位置 0, 1, 2, 3.....
    //該件產品沒有被加入過去購物車 => 返回 -1

    let [numInCart,setNumInCart] = useState(
        (productIndexInCart===-1) ? 0 : cartItems[productIndexInCart].quantity
    )

    const handleAdd = ()=>{

        if(productIndexInCart===-1)
        {
            //購物車本身沒有，在cartItems array中加個新element (object)
            setCartItems(
                [{
                    id : productInfo.id,
                    name:productInfo.name,
                    image:productInfo.image,
                    price:productInfo.price,
                    description:productInfo.description,
                    quantity:1
                },
                ...cartItems]
            )
        }
        else
        {
            //購物車有該產品，只加個quantity
            let newCartArray = [...cartItems]
            newCartArray[productIndexInCart].quantity++
            setCartItems(newCartArray)
        }
        CartContext.cartItems = cartItems; 
        setNumInCart(numInCart+1)
        // setDimension(window.innerWidth)
    //     const rect = product.getBoundingClientRect();

    // const offsetWidth = document.querySelector('#offset-width');
    // const bcrWidth = document.querySelector('#bcr-width');

    // offsetWidth.innerHTML = product.offsetWidth;
    // bcrWidth.innerHTML = rect.width;
    //   const x = window.pageXOffset + rect.left;
    //   const y = window.pageYOffset + rect.top;
    }

    const handleSubtract = ()=>{

        if(cartItems[productIndexInCart].quantity===1)
        {
            //購在物車中只剩一件的話，remove object
            let newCartArray = [...cartItems]
            newCartArray.splice(productIndexInCart,1)
            setCartItems(newCartArray)
        }
        else
        {
            //只減個quantity
            let newCartArray = [...cartItems]
            newCartArray[productIndexInCart].quantity--
            setCartItems(newCartArray)
        }
        CartContext.cartItems = cartItems; 
        setNumInCart(numInCart-1)
    }
    const handleRemove = ()=>{
        //購在物車中只剩一件的話，remove object
        let newCartArray = [...cartItems]
        newCartArray.splice(productIndexInCart,1)
        CartContext.cartItems = cartItems; 
        setCartItems(newCartArray)
        setNumInCart(0)
        // setDimension(screenSize.dynamicHeight)
    }

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

    var dd = document.querySelector('#aa')  
    function goTo(){
      dd.scrollIntoView()
    }


    

    return (
        <div>
            {
                <div>
                    {/* <span onClick={handleSubtract}>-</span>
                    {numInCart}件
                    <span onClick={handleAdd}>+</span> */}
                    <input type='button' value='-' class='qtyminus' onClick={handleSubtract} field='quantity' />
                    <input type='text' name='quantity' value={numInCart} class='qty' />
                    <input type='button' value='+' class='qtyplus' onClick={handleAdd} field='quantity' />
                    {/* <p className="prodlabel">/斤/OO元</p> */}
                    <div className="quantity" >
                        {/*  refs={listRef} */}
                        <div className="Remove" onClick={handleRemove}  field='quantity' >
                            <a href="#" class="btn btn-card-large 1_t" onClick={e => {setClick(!click);}}>
                                <img className="trolley_card" id="trolley_card" alt="Trolley" src={image} style={style}/>
                                移出購物車
                            </a>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}