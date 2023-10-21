import React from "react";
import { useEffect , useState} from 'react';
import "./DesktopStyle.css";
import {Link, Route, Routes, useNavigate} from 'react-router-dom'
import Login from "./Login";
import banner from './img/image.jpg';
import trolley from './img/trolley-1-1.png';
import intr1 from './img/image-4.jpg';
import intr2 from './img/image-5.jpg';
import background from './img/contactBackground.png';
import contact from './img/az0qy-issbv.jpg';
import location from './img/location-pin.png';
import mail from './img/mail.png';
import phone from './img/telephone-call.png';
import crown from './img/crown.png';
import top from './img/top.png';
import MyComponent from './App';
import banner2 from './img/AdobeStock_581154616.jpeg';
import $ from 'jquery';
import { clear } from '@testing-library/user-event/dist/clear';
import CartContext from './CartContext.js';
import {Productcard} from "./Productcard";
import axios from './backend/apiUtil.js';
import { useAuth } from "./Context.js";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const url = 'http://localhost:3000';
window.$ = $;
function myfunction(){
//   document.body.addEventListener('touchmove', function(e){
//   if(!$('div').hasClass('scroll')){
//      e.preventDefault();
//   }
// },{ passive: false })
$('.imf').click(function () {$('body').animate({scrollTop: 0}, 1500)});
}



function Desktop(){
  
  const MySwal = withReactContent(Swal);
  // const url = 'https://todoo.5xcamp.us/';
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  const [todos, setTodos]= useState([]);
  const [value,setValue] = useState(""); // todo input
  const [tabState,setTabState] = useState("all"); // tab state

  const headers = {
    Authorization: token
  }
  
  // mongoose.connect('mongodb://localhost:27017/test');
  
  
  useEffect(()=>{
    getTodo();
  },[]);

  function getTodo(){
    console.log('重新取得todo')
    axios.get(url, {headers}).then((res)=>{
      setTodos(res.data.todos);
    }).catch(err=>{
      return MySwal.fire({
        icon: 'error',
        title: '取得失敗',
      })
    })
  }
  const logout = (e) => {
    e.preventDefault();
    
  //   const url = 'https://todoo.5xcamp.us/users/sign_out';
  //   axios.delete(url, {headers}).then(res=>{
  //     setToken(null);
  //     navigate('/login');
  //   }).catch(err=>{
  //     setToken(null);
  //     navigate('/login');
  //   })
  // }
  
    axios.delete(url, {headers}).then(res=>{
      setToken(null);
      navigate('/login');
    }).catch(err=>{
      setToken(null);
      navigate('/login');
    })
  }
  const loginoutRender = () => {
    // todo 有值
    // if(todos.length){
      let todolist = [];
      console.log(token);
      if (token) {
        // 全部
        return (todolist = <Link to={"/login"} className="a1">登出</Link> )
        // todolist = todos.map((item, i)=>{
        //   return <Link to={"/login"} className="a1">登出</Link> 
        // })
      } else {
          return  (todolist = <Link to={"/login"} className="a1">登入</Link> )
      }

      // return todolist
    // } 
    
    // todo 無值
    // return <li className="text-danger fw-bold">目前尚無代辦事項</li>
  }
  const nicknameRender = () => {
    // todo 有值
    // if(todos.length){
      let todolist = [];
      console.log(token);
      if (token) {
        // 全部
        return (todolist = <Link to={"/login"} className="a1">登出</Link> )
        // todolist = todos.map((item, i)=>{
        //   return <Link to={"/login"} className="a1">登出</Link> 
        // })
      } else {
          return  (todolist = <Link to={"/signup"} className="a1">註冊</Link> )
      }

      // return todolist
    // } 
    
    // todo 無值
    // return <li className="text-danger fw-bold">目前尚無代辦事項</li>
  }
  return (
    
    <div className="desktop">{/*navbar+banner+group234+top */}
      <div className="div">{/*navbar+banner+group234 */}
         <div className="overlap">{/*navbar+banner */}
        {/* <div class="navbar py-2 bg-body-tertiary border-bottom"> */}
        {/* <div class="wrap"> */}
          <div class="header">{/* navbar */}
            <div class="logo1 align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                <Link>蔬菜盒子</Link>
            </div>
            <ul class="menu">
                <li><a href="#" class="dropdown a1">訂單資訊</a>
                    <ul class="dropdown-open">
                        <li><Link to={"/payment"} className="a1">出貨進度</Link></li>
                        <li><Link to={"/payment"} href="#">退貨申請</Link></li>
                        <li><Link to={"/payment"} href="#">退貨進度</Link></li>
                    </ul>
                </li>
                <li><Link to={"/product"} className="a1">產品</Link></li>
                <li>{ nicknameRender() }</li>
                <li>{ loginoutRender() }</li>
                {/* <Link to={"/login"} className="a1">登入</Link> */}
                <li><Link to={"/checkout"} className="a2"><img className="trolley" alt="Trolley" src={trolley} /></Link></li>
                {/*  class="nav-item" */}
            </ul>
          </div>
          <div className="rectangle-2">{/* */}
            <img className="image" alt="" src={banner2} />
            <div className="view">
              <div className="overlap-group">
                <div className="text-wrapper-5">開始購物</div>
              </div>
            </div>
            <h1 className="h-1">新鮮直送蔬菜盒</h1>
          </div>
        </div>
        <div className="group4">
          <div className="group-4">
            <div className="text-wrapper-12">
              <div className="h11">熱銷組合</div>
            </div>
            <div className="row1">
              {/* <div className="rectangle-3" /> */}
              <img className="crown" alt="Crown" src={crown} />
              <div className="text-wrapper-13">蘋果+香蕉+小白菜+蔥+洋蔥</div>
            </div>
            <div className="row2">
              <div className="text-wrapper-14">高麗菜+地瓜葉</div>
            </div>
            <div className="row3">
              <div className="text-wrapper-15">絲瓜+大陸妹+花椰菜</div>
            </div>
          </div>
        </div>
        <div className="group2">
          <div className="group-2">
            <div className="row pic1">
              <img className="img col-6" alt="" src={intr1} />
              <div className="wordpic1 col-6">
                <div className="text-wrapper-7">自選購蔬果盒子，多元便利</div>
                <div className="text-wrapper-10">
                  線上選取蔬果的組合，在一個禮拜之內送達，不用擔心量
                  <br />
                  太多會無法食用完畢，並且價格公道，比起在量販店購買
                  <br />
                  ，更加便利。
                </div>
              </div>
            </div>
            <div className="row pic2">
              <div className="image2 col-6"><img className=" image-2" alt="" src={intr2} /></div>
              <div className="col-6 wordpic2">
                <div className="text-wrapper-8">產地直達，絕對新鮮</div>
                <div className="text-wrapper-9">
                  產地專車包裝好訂單後，一大早直達客戶的家，少了層層
                  <br />
                  銷售囤貨的時間，最是新鮮，且農民及賣家，產銷履歷一
                  <br />
                  目了然，以誠信為本，希望給客戶健康安心。。
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="group-3">
          <div className="overlap-3">
            <img className="undraw-send-gift-re" alt="Undraw send gift re" src={contact} />
            <div className="connection">
              <div className="text-wrapper-11">
                <div className="textme">聯繫我們</div>
              </div>
              <div className="locD ">
                <img className="location-pin" alt="Location pin" src={location} />
                <h2 className="loc"></h2>
              </div>
              <div className="malD">
                <img className="mail" alt="Mail" src={mail} />
                <h2 className="mal"></h2>
              </div>
              <div className="phD">
                <img className="telephone-call" alt="Telephone call" src={phone} />
                <h2 className="ph"></h2>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <div class="top">
        <a href="#" onClick={myfunction()}>
          <img src={top} alt="" class="imf" width="50px"/>
        </a>
      </div>
      
      
    </div>
  );
};

export default Desktop;
