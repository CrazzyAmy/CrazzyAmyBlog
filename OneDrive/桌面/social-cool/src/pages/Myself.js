import { Menu, Form, Container, Message } from 'semantic-ui-react';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { firebase, auth, firestore } from '../utils/firebase';
import { Helmet } from 'react-helmet';
import ReactGA, { set } from 'react-ga';
import Typekit from 'react-typekit';
import '../css/myself.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../Header';

function Myself() {
  return (
    <Container className='myself'>
      <Header />
      <div className='gallery_myself'>
        <img src='https://firebasestorage.googleapis.com/v0/b/socialcool-93b74.appspot.com/o/post-Images%2Fheadshot.png?alt=media&token=b13910be-cd52-4c0b-999d-3a5a9a0358e0' />
        <img src='https://firebasestorage.googleapis.com/v0/b/socialcool-93b74.appspot.com/o/post-Images%2Fbedminton.jpg?alt=media&token=a59de51f-d487-469c-9e6c-4f2c923d22e7' />
        <img src='https://firebasestorage.googleapis.com/v0/b/socialcool-93b74.appspot.com/o/post-Images%2Fmovie.jpg?alt=media&token=3c3c2c23-e117-49ca-9ba9-1ffebed2197b' />
        <img src='https://firebasestorage.googleapis.com/v0/b/socialcool-93b74.appspot.com/o/post-Images%2Ftravel.jpg?alt=media&token=267d2a21-92b5-42b9-9206-67bad2b58544' />
      </div>
      <div>
        <h1>關於我</h1>
        <p>
          你好，我是
          CrazzyAmy，這裡會分享我React的自學筆記，然後我是一個喜歡旅遊、電影、羽毛球的女生。在這裡我會分享我的生活點滴，歡迎來到我的部落格！
        </p>
        <p>Email: amn82910@gmail.com</p>
        <p>Instagram: @xiannn.0616/(追影日常) @yunlovemovie</p>
      </div>
      <script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'></script>
      <script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js'></script>
      <script src='https://fonts.googleapis.com'></script>
      <link
        rel='preconnect'
        href='https://fonts.gstatic.com'
        crossorigin
      ></link>
      <link
        href='https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&family=Noto+Serif+SC&display=swap'
        rel='stylesheet'
      ></link>
    </Container>
  );
}
export default Myself;
