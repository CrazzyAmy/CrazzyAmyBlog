import React from "react";
import ReactDOM from 'react-dom/client';
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

class Product extends React.Component {

    state = {
      showPerson: false
    }
    showPerson= ()=> {
      this.setState({showPerson:!this.state.showPerson});
    }
  
    render() {
      const style = {
        height: "20px",
        width: "20px",
      };
      
      const classes=['bold'];
      if(this.state.showPerson){
        classes.push('red');
      }
      
      
      let persons = null;
      if (this.state.showPerson) {
        persons = (
          <h1 className={classes.join(' ')}>Hello World! Andy</h1>
        );
        style.backgroundColor='green';
      }
      
      return (
        <div className="product">
      <div className="div">
        <div class="header">{/* navbar */}
            <div class="logo1 align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                <Link to={"/"}>蔬菜盒子</Link>
            </div>
            <ul class="menu">
                <li><a href="#" class="dropdown a1">訂單資訊</a>
                    <ul class="dropdown-open">
                        <li><a href="#">出貨進度</a></li>
                        <li><a href="#">退貨申請</a></li>
                        <li><a href="#">退貨進度</a></li>
                    </ul>
                </li>
                <li><a className="a1" href="#">產品</a></li>
                <li><Link to={"/payment"} className="a2"><img className="trolley" alt="Trolley" src={trolley} /></Link></li>
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
                <div className="productlist">
                  <div class="card">
                    <img class="card-img-top" src={mango} alt="Card image cap"/>
                    <div class="card-body">
                      <h5 class="card-title">愛文芒果</h5>
                      {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                      <form id='myform' method='POST' action='#' className="myform">
                          <input type='button' value='-' class='qtyminus' field='quantity' />
                          <input type='text' name='quantity' value='0' class='qty' />
                          <input type='button' value='+' class='qtyplus' field='quantity' />
                          <p className="prodlabel">/斤</p>
                          {/* onClick={e => {
          setClick(click=!click);
        }} */}
                          <a href="#" class="btn btn-card 1_t" ><img className="trolley_card" id="trolley_card" alt="Trolley" src={trolley1}/></a>
                          <a href="#" class="btn btn-card 1_h"><img className="heart_card" alt="heart" src={heart1} /></a>
                      </form>
                      
                      
                      
                    </div>
                  </div>
                  <div className="Rup1">
                    <div className="text-wrapper-7">總累計消費金額</div>
                    <p>NT$0</p>
                  </div>
                  <div className="Rup2">
                    <div className="text-wrapper-8">可用紅利點數</div>
                    <p>0點</p>
                  </div>
                  <div className="Rup3">
                    <div className="text-wrapper-9">專屬優惠券</div>
                    <p>0張</p>
                  </div>
                  <div className="but">
                    <button className="but1">查詢訂單</button>
                    <button className="but2">查詢定期定額訂單</button>
                  </div>
                </div>
                <div className="infoRdown">
                  <div className="text-wrapper-29">近期訂單</div>
                  <div className="text-wrapper-30">近期無新訂單</div>
                </div>
              {/* </div> */}
            </div>
          </div>
        
        
      </div>
    </div>
        // <div className="App">
        //    <button
        //     style={style}
        //     onClick={this.showPerson}>Switch Name</button>
        //   {/* 按鈕顯示資料使用js判斷 */}
        //   {persons}
        // </div>
  
      );
    }
  }
  
  ReactDOM.render(<Product/>, document.querySelector('#product'));