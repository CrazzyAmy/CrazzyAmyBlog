import React from "react";
import ReactDOM from 'react-dom/client';
import "./LoginStyle.css";
import {
  HashRouter,
  NavLink,
  Link,
  Route,
  Routes,
  useNavigate,
  useParams,
  Outlet
} from 'react-router-dom'
import {Desktop} from "./Desktop.jsx";
import Payment from "./Payment.jsx";
// import (Payment) from "./Payment.jsx";
import cart from "./img/image-1.png";
import trolley from './img/trolley-1-1.png';
import undrawLoginRe from "./img/acw6d-anh06.jpg";
import {FullDesc} from './index.js';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import { ClickWithRef } from "./index.js";
import {useState} from 'react';
import axios from './backend/apiUtil.js';
import { clear } from '@testing-library/user-event/dist/clear';
import { useForm } from "react-hook-form";

function Login_2(){
const [click, setClick] = useState(false);
// const { event } = this.props;
const [password, setPassword] = useState("password");
const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur"
    });
    const login = (data) => {
    axios.post('https://todoo.5xcamp.us/users/sign_in', {user:data})
        .then(res => {
        console.log(res.data)
        alert(JSON.stringify(res.data.message));
        localStorage.setItem('token', res.headers.authorization);
        navigate('/')
        })
        .catch(error => {
        alert(JSON.stringify(error.response.data.message));
        });
    }
  return (
    <div className="login">
      <div className="div">
        <div className="overlap">{/* navbar+login */}
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
          <div class="container-fluid main-container ">
          {/* <div class="rounded border "> */}
            {/* <div className="main-container-column"> */}
            <div class="overlap-group row  g-0 flex-row flex-md-row mb-4 mb-md-0">
                <div className="pic mb-4 col-6">
                  <div className="text-wrapper-2">登入</div>
                  <img className="undraw-login-re" alt="Undraw login re" src={undrawLoginRe} />
                </div>
                
                <form className="form-signin-region col-6" action="" method="POST" onSubmit={handleSubmit(login)}>
                    <div class="form-signin">
                        <input type="text" class="form-control"  required {...register("email", { required: true , pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })}/>
                        {errors.email && errors.email.type === "required" && <span>此欄位不可留空</span>}
                        {errors.email && errors.email.type === "pattern" && <span>不符合 Email 規則</span> }
                        <label for="POST-email" class="form-row-field">Email Address</label>
                    </div>
                    
                    <div class="form-signin">
                        <input type="password" autoComplete="current-password" className="form-control" required {...register("password", { required: { value: true, message: "此欄位必填" }, minLength: {value: 6, message:  "密碼至少為 6 碼"}})} />
                        {/* onChange={handleTogglePw} type={handleTogglePw}  */}
                        <span>{errors.password?.message}</span>
                        <label for="POST-password" class="form-row-field floatingPassword ">Password</label>
                    </div> 
                    <input class="form-btn" type="submit" value="送出"/>
                    <div className="text-wrapper-5"><Link to={"/signup"}>還沒有註冊?</Link></div>
                          <div className="text-wrapper-6">忘記密碼?</div>
                </form>
            </div>
          </div>
        </div>
        <div className="rectangle-4" />
      </div>
    </div>
  );
};

export default Login_2;