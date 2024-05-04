import { Menu, Form, Container, Message } from 'semantic-ui-react';
import Header from '../Header';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { firebase, auth, firestore } from '../utils/firebase';
import { Helmet } from 'react-helmet';
import ReactGA, { set } from 'react-ga';
import Typekit from 'react-typekit';
// import { auth } from '../utils/firebase';
// function onSubmit(event) {
//   event.preventDefault();
//   if (activeItem === 'register') {
//     firebase
//       .auth()
//       .createUserWithEmailAndPassword(email, password)
//       .then(() => {
//         navigate.push('/');
//       });
//   } else if (activeItem === 'signin') {
//     firebase
//       .auth()
//       .signInWithEmailAndPassword(email, password)
//       .then(() => {
//         navigate.push('/');
//       });
//   }
//   console.log(email, password, activeItem);
// }
// import 'firebase/auth';

function Signin() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = React.useState('register');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  // const onSubmit = (event) => {
  //   event.preventDefault(); //防止表單預設的行為
  function onSubmit(event) {
    setIsLoading(true);
    event.preventDefault(); //防止表單預設的行為
    if (activeItem === 'register') {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('註冊成功');
          navigate('/');
          setIsLoading(true);
        })
        .catch((error) => {
          console.log(error.code, error.message);
          switch (error.code) {
            case 'auth/email-already-in-use':
              setErrorMessage('信箱已經被使用');
              break;
            case 'auth/invalid-email':
              setErrorMessage('信箱格式不正確');
              break;
            case 'auth/weak-password':
              setErrorMessage('密碼強度不足');
              break;
            case 'auth/missing-password':
              setErrorMessage('請輸入密碼');
              break;
            default:
              setErrorMessage(`發生未知錯誤 ${error.code}, ${error.message}`);
          }
          setIsLoading(false);
        }); //註冊，做導頁的動作
    } else if (activeItem === 'signin') {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('登入成功');
          navigate('/'); //登入，做導頁的動作
          setIsLoading(true);
        })
        .catch((error) => {
          console.log(error.code, error.message);
          switch (error.code) {
            case 'auth/invalid-credential':
              setErrorMessage('電子郵件或密碼有誤');
              break;
            case 'auth/missing-password':
              setErrorMessage('請輸入密碼');
              break;
            case 'auth/invalid-email':
              setErrorMessage('信箱格式不正確');
              break;
            case 'auth/user-not-found':
              setErrorMessage('信箱不存在');
              break;
            case 'auth/wrong-password':
              setErrorMessage('密碼錯誤');
              break;
            default:
              setErrorMessage(`發生未知錯誤 ${error.code}, ${error.message}`);
          }
          setIsLoading(false);
        });
    } //Day6 8:49
    console.log(email, password, activeItem);
  }
  return (
    <Container>
      <Header />
      <Menu widths='2'>
        <Menu.Item
          active={activeItem === 'register'}
          onClick={() => {
            setErrorMessage('');
            setActiveItem('register');
          }}
          to='/'
        >
          註冊
        </Menu.Item>
        <Menu.Item
          active={activeItem === 'signin'}
          onClick={() => {
            setErrorMessage('');
            setActiveItem('signin');
          }}
          to='/'
        >
          登入
        </Menu.Item>
      </Menu>
      <Form onSubmit={onSubmit}>
        {/* onSubmit={} */}
        <Form.Input
          label='信箱'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='請輸入信箱'
        />
        <Form.Input
          label='密碼'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='請輸入密碼'
          type='password'
        />
        {errorMessage && <Message color='red'>{errorMessage}</Message>}
        <Form.Button type='submit' loading={isLoading}>
          {activeItem === 'register' && '註冊'}
          {activeItem === 'signin' && '登入'}
        </Form.Button>
      </Form>
      {/* <Helmet>
        <script src='https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&callback=console.debug&libraries=maps,marker&v=beta'></script>
        <script>
          try{Typekit.load({ async: true })}catch(e){}
        </script>
      </Helmet>
      <gmp-map
        center='22.997129440307617,120.21240997314453'
        zoom='14'
        map-id='DEMO_MAP_ID'
        style='height: 100%; margin: 0;padding: 0;'
      >
        <gmp-advanced-marker
          position='22.997129440307617,120.21240997314453'
          title='My location'
        ></gmp-advanced-marker>
      </gmp-map> */}
    </Container>
  );
}
export default Signin;
