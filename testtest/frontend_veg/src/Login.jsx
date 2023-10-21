import React, { useState, useRef, useEffect, useContext } from "react";
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
// import addDB from "./postModel.js";
// import (Payment) from "./Payment.jsx";
import cart from "./img/image-1.png";
import trolley from './img/trolley-1-1.png';
import undrawLoginRe from "./img/acw6d-anh06.jpg";
import {FullDesc} from './index.js';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import { ClickWithRef } from "./index.js";
import axios from './backend/apiUtil.js';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { clear } from '@testing-library/user-event/dist/clear';
import { useForm } from "react-hook-form";
import { AuthContext, AuthProvider, useAuth } from "./Context.js";
import Handlebars from "handlebars";
const MySwal = withReactContent(Swal);
let USER_REGEX = /^\[A-z\][A-z0-9-_]{3,23}$/;
let PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;



function Login(){
const [click, setClick] = useState(false);
// const { event } = this.props;
const [password, setPassword] = useState("password");
let { token, setToken } = useAuth();
const navigate = useNavigate();
const { register, formState: { errors } } = useForm({
    mode: "onBlur"
});
const url = 'http://localhost:8000/users';

  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  // let [auth, setAuth] = useState({});
  const { setAuth } = useAuth;
  useEffect(() => {
    setTimeout(() => {
      userRef.current.focus();
    }, 500);

    
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);
// const login = (data) => {
  
//   axios.post('https://todoo.5xcamp.us/users/sign_in', {user:data})
//     .then(res => {
//       console.log(res.data)
//       alert(JSON.stringify(res.data.message));
//       localStorage.setItem('token', res.headers.authorization);
//       navigate('/')
//     })
//     .catch(error => {
//       alert(JSON.stringify(error.response.data.message));
//     });
// }

// const onSubmit = (data) => {
//   axios.post(url, {user:data}).then(res=>{
//     setToken(res.headers.authorization);
//     navigate('/');
//   }).catch(err=>{
//     MySwal.fire({
//       icon: 'error',
//       title: err.response.data.message? err.response.data.message:'登入失敗',
//     });
//   })
// };
// console.log(token);


// const loginForm = document.querySelector("#login")

// loginForm.addEventListener("submit", function (event) {
//   // Stop the default submit and page load
//   event.preventDefault()

//   const email = document.querySelector("#email").value
//   const password = document.querySelector("#password").value

//   // Handle validations
//   axios
//     .post(url, { email, password })
//     .then(response => {
//       setToken(response.headers.authorization);
// //     navigate('/');
//       console.log(response)
//       // Handle response
//     })
//     .catch(err=>{
//       MySwal.fire({
//         icon: 'error',
//         title: err.response.data.message? err.response.data.message:'登入失敗',
//       });
//     })
// })
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        let response = await axios.post(
          url,
          JSON.stringify({ user, pwd }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        let accessToken = response?.data?.accessToken;
        let roles = response?.data?.roles;
        setAuth({ user, pwd, roles, accessToken });
        setUser("");
        setPwd("");
        setSuccess(true);
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Missing Username or Password");
        } else if (err.response?.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login Failed");
        }
        errRef.current.focus();
      }
    };
    const hbr = `
    <p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
    "{{kids.length}} kids:</p>" +
    "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>
    `;

    const template = Handlebars.compile(hbr);

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
                <form id="login" className="form-signin-region col-6" action="/users/login" method="post" onSubmit={handleSubmit} >
                  {/* onSubmit={handleSubmit(onSubmit)} */}
                  {/*  type="text" class="form-control"  required {...register("email", { required: true , pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })} */}
                  <div class="form-signin">
                    <input
                      class="form-control email"
                      id="email"
                      type="text"
                      onChange={(e) => setUser(e.target.value)}
                      required {...register("email", { required: true , pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: 'invalid email address', autoComplete:"off", value:{user}})}
                    />
                    {errors.email && errors.email.message}
                  </div>
                    {/* <input type="password" autoComplete="current-password" className="form-control" required {...register("password", { required: { value: true, message: "此欄位必填" }, minLength: {value: 6, message:  "密碼至少為 6 碼"}})} /> */}
                  <div class="form-signin">
                    <input
                      className="form-control password"
                      id="password"
                      type="password"
                      autoComplete="current-password" 
                      onChange={(e) => setPwd(e.target.value)}
                      required {...register("password", { required:true , value: {pwd}, message: "此欄位必填" , validate: (value) => value !== 'admin' || 'Nice try!', minLength: {value: 6, message:  "密碼至少為 6 碼"}})}
                      
                    />
                    {errors.username && errors.username.message}
                  </div>
                  <button className="form-btn" type='submit'>Submit</button>
                </form>

                {/* <form className="form-signin-region col-6" action="/addDB" method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <div class="form-signin">
                        <input type="text" class="form-control"  required {...register("email", { required: true , pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })}/>
                        {errors.email && errors.email.type === "required" && <span>此欄位不可留空</span>}
                        {errors.email && errors.email.type === "pattern" && <span>不符合 Email 規則</span> }
                        <label for="POST-email" class="form-row-field">Email Address</label>
                    </div>
                    
                    <div class="form-signin">
                        <input type="password" autoComplete="current-password" className="form-control" required {...register("password", { required: { value: true, message: "此欄位必填" }, minLength: {value: 6, message:  "密碼至少為 6 碼"}})} />
                        <span>{errors.password?.message}</span>
                        <label for="POST-password" class="form-row-field floatingPassword ">Password</label>
                    </div> 
                    <input class="form-btn" type="submit" value="送出"/>
                    <div className="text-wrapper-5"><Link to={"/signup"}>還沒有註冊?</Link></div>
                          <div className="text-wrapper-6">忘記密碼?</div>
                </form> */}
            </div>
          </div>
        </div>
        <div className="rectangle-4" />
      </div>
    </div>
  );
};

export default Login;