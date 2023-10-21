import React from "react";
import {Link, Route, Routes} from 'react-router-dom'
import trolley from "./img/trolley-1-1.png";
import "./Signupstyle.css";

function Signup(){
  
  return (
      
    <div className="signup">
      <div className="div">
        <div class="header">{/* navbar */}
            <div class="logo1 align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                <Link to={"/"}>蔬菜盒子</Link>
            </div>
            <ul class="menu">
                <li><a href="#" class="dropdown a1">訂單資訊</a>
                    <ul class="dropdown-open">
                        <li><Link to={"/product"} className="a2"><a href="#">出貨進度</a></Link></li>
                        <li><a href="#">退貨申請</a></li>
                        <li><a href="#">退貨進度</a></li>
                    </ul>
                </li>
                <li><a className="a1" href="#">產品</a></li>
                <li><Link to={"/payment"} className="a2"><img className="trolley" alt="Trolley" src={trolley} /></Link></li>
                {/*  class="nav-item" */}
            </ul>
          </div>
          <div className="con">
            <div className=" leftbar">
              <div className="text-wrapper-28">我的帳戶</div>
              <div className="text-wrapper-25">我的帳戶</div>
              <div className="text-wrapper-15">更新個人資訊</div>
              <div className="text-wrapper-16">更改密碼</div>
              <div className="text-wrapper-17">訂單查詢</div>
              <div className="text-wrapper-18">電子票卷訂單查詢</div>
              <div className="text-wrapper-19">收件地址管理</div>
              <div className="text-wrapper-20">專屬優惠劵</div>
              <div className="text-wrapper-21">紅利點數</div>
              <div className="text-wrapper-22">收藏清單</div>
              <div className="text-wrapper-23">詢問記錄</div>
              <div className="text-wrapper-24">我的帳戶</div>
            </div>
            <div className="  mainbar">
              <div className="row infor">
                <div className="col-3 infoLeft">
                  <div className="text-wrapper-5">使用者名稱</div>
                  <div className="text-wrapper-6">查看個人資訊</div>
                </div>
                <div className="col-7 infoRup">
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
              </div>
            </div>
          </div>
        
        
      </div>
    </div>
    
  );
};
export default Signup;
