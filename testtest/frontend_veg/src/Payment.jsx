import React from "react";
import {Link, Route, Routes, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import line from "./img/1485482196-line_78675.png";
import google from "./img/google_icon-icons.com_62736.png";
import background from "./img/image-3.png";
import trolley from "./img/trolley-1-1.png";
import "./Paymentstyle.css";
import axios from './backend/apiUtil.js';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import constraint from './services/formRule.js';
import { useAuth } from "./Context.js";
const MySwal = withReactContent(Swal);

function Payment() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const url = 'https://todoo.5xcamp.us/users';

  const onSubmit = (data) => {
    // console.log(data)
    const {nickname, password, passwordCheck} = data;

    if(nickname.trim() ===''){
      return MySwal.fire({
        icon: 'error',
        title: '姓名不可空白',
      });
    }
    if(password.trim() ===''){
      return MySwal.fire({
        icon: 'error',
        title: '密碼不可空白',
      });
    }
    if(password !== passwordCheck){
      return MySwal.fire({
        icon: 'error',
        title: '密碼不一致',
      });
    }

    axios.post(url, {user:data}).then(res=>{
      setToken(res.headers.authorization);
      MySwal.fire({
        icon: 'success',
        title: res.data.message,
      });
      navigate('/');
    }).catch(err=>{
      MySwal.fire({
        icon: 'error',
        title: err.response.data.message? err.response.data.message:'註冊失敗',
        text: err.response.data.error[0]?err.response.data.error[0]:'',
      });
    })
  };
  return (
    <div className="payment">
      <div className="overlap">
      <div class="header">{/* navbar */}
        <div class="logo1 align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
            <Link>蔬菜盒子</Link>
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
            <li><Link to={"/signup"} className="a1">註冊</Link></li>
            <li><Link to={"/login"} className="a1">登入</Link></li>
            <li><Link to={"/payment"} className="a2"><img className="trolley" alt="Trolley" src={trolley} /></Link></li>
            {/*  class="nav-item" */}
        </ul>
      </div>
      <div className="workspace">
          {/* <img className="image" alt="" src={background} />
          <img className="img" alt="" src={background} /> */}
        <div className="workspaceInnerbox">
          <div className="fastsignin">
            <div className="text-wrapper-12">註冊新帳號</div>
            <div className="twoway">
              <button className="box box1">
                <img className="element-line" alt="Element line" src={line} />
                <div className="text-wrapper-13">快速註冊</div>
              </button>
              <button className="box box2">
                <img className="google-icon-icons" alt="Google icon icons" src={google} />
                <div className="text-wrapper-14">快速註冊</div>
              </button>
            </div>
          </div>
          <div className="separatealine">
            <div className="line"></div>
            <p>or</p>
            <div className="line"></div>
          </div>
          <form  className="formControls" onSubmit={handleSubmit(onSubmit)}>
            <div className="text-wrapper-5">電子郵件＆手機註冊</div>
            <div className="block name">
              <label htmlFor="nickname">姓名 (必填)</label>
              <input type="text" id="nickname"  {...register("nickname", constraint.name)} />
              <span>{errors.nickname?.message}</span>
            </div>
            <div className="block email">
              <label htmlFor="email">電子郵件 (必填)</label>
              <input type="text" id="email" {...register("email", constraint.email)} />
              <span>{errors.email?.message}</span>
            </div>
            <div className="block phone">
              <label htmlFor="">手機 (必填)</label>
              <input type="text" />
            </div>
            <div className="block birth">
              <label htmlFor="">生日</label>
              <input type="text" />
            </div>
            <div className="block passwd">
              <label htmlFor="password">密碼 (必填)</label>
              <input  type="password" id="password"  {...register("password", constraint.password)} />
              <span>{errors.password?.message}</span>
            </div>
            <div className="block repasswd">
              <label htmlFor="passwordCheck">密碼確認 (必填)</label>
              <input  type="password" id="passwordCheck"  {...register("passwordCheck", constraint.password)} />
              <span>{errors.passwordCheck?.message}</span>
            </div>
            <input className="text-wrapper-16" type="submit" value="加入會員" />
            {/* <button className="text-wrapper-16" >加入會員</button> */}
            <div className="agree">
              <div className="text-wrapper-3">我已經有會員帳號了?</div>
              <div className="text-wrapper-4"><Link to="/login">回登入頁面</Link></div>
            </div>
            <div className="agree2">
              <div className="text-wrapper-17">註冊表示同意</div>
              <div className="text-wrapper-18">商店服務條款</div>
              <div className="text-wrapper-19">與</div>
              <div className="text-wrapper-20">會員責任規範及個資聲明</div>
            </div>
            
          </form>
          {/* <div className="rectangle-2" /> */}
          
          
          {/* <div className="text-wrapper-6"></div>
          <div className="text-wrapper-7"></div>
          <div className="text-wrapper-8"></div>
          <div className="text-wrapper-9"></div>
          <div className="text-wrapper-10"></div>
          <div className="text-wrapper-11"></div>
          <div className="rectangle-3" />
          <div className="rectangle-4" />
          <div className="rectangle-5" />
          <div className="rectangle-6" />
          <div className="rectangle-7" />
          <div className="rectangle-8" />
          <div className="rectangle-9" />
          
          <div className="rectangle-10" />
          <div className="rectangle-11" />
          

          <div className="line" alt="Line"></div>
          <div className="line-2" alt="Line"></div>
          <div className="text-wrapper-15">or</div> */}

          
          
        </div>
      </div>
      </div>
    </div>
  );
}
export default Payment;
