import {
  Menu,
  Form,
  Container,
  Message,
  Item,
  Image,
  Icon,
} from 'semantic-ui-react';
import React, { useState, useEffect, useRef } from 'react';
import Header from '../Header';
import '../css/main.css';
import gsap, { Expo } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useNavigate } from 'react-router-dom';
import { firebase, auth, firestore } from '../utils/firebase';
import { useMediaQuery } from 'react-responsive';
import Banner from '../Banner';
import { Grid } from 'semantic-ui-react';
import Topics from '../components/Topics';
// import { preinit } from 'react-dom/experimental';

function Main() {
  const [posts, setPosts] = React.useState([]); // [posts, setPosts]
  React.useEffect(() => {
    firebase
      .firestore()
      .collection('posts_main')
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        setPosts(data);
      });
  }, []);
  const navigate = useNavigate();
  const handleClick_1 = () => {
    navigate('/myself');
  };
  const handleClick_2 = () => {
    navigate('/posts');
  };
  const [user, setUser] = useState(null);
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      console.log('Header unmounted');
    });
  }, []);
  const toggleButton = document.querySelector('.burger');
  const menuItems = document.querySelectorAll('.menu-item p');
  const overlayMenu = document.querySelector('.overlay-menu');
  const overlay = document.querySelector('.overlay');
  let isOpen = false;

  // const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  // const isMobile = useMediaQuery({ maxWidth: 425 });
  menuItems.forEach((item, index) => {
    item.style.setProperty('--delay', `${index * 0.1 + 0.4}s`);
  });
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      overlay.classList.toggle('is-active');
      overlayMenu.classList.toggle('is-active');
      toggleButton.classList.toggle('is-active');
      if (overlay.classList === 'is-active') {
        const toggleTimeline = gsap.timeline();
        toggleTimeline.to('.items', 0.5, {
          opacity: 0,
          y: 40,
          ease: Expo.easeInOut,
          duration: 1,
        });
      }
    });
  }
  const bannerTimeline = gsap.timeline();
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const galleryWidth = document.querySelector('.gallery').scrollWidth;
    const scrollLength = galleryWidth - window.innerWidth;
    console.log(scrollLength);
    console.log(galleryWidth);
    // gsap code here...
    bannerTimeline
      .from('.something', 2, {
        opacity: 1,
        y: 40,
        ease: Expo.easeInOut,
        duration: 1,
      })
      .to('.something', 0.5, {
        opacity: 0,
        y: 40,
        ease: Expo.easeInOut,
        duration: 1,
        // visibility: hidden,
      })
      .staggerFrom(
        '.something_logo',
        0.1,
        {
          opacity: 0,
          y: 40,
          ease: Expo.easeInOut,
        },
        0.1,
        '-=0.6'
      )
      .staggerFrom(
        '.main_grid',
        0.4,
        {
          opacity: 0,
          x: -80,
          ease: Expo.easeInOut,
        },
        0.1,
        '-=0.6'
      )
      .to('.gallery', {
        x: -scrollLength,
        ease: 'none',
        scrollTrigger: {
          trigger: '.galleryWrapper',
          start: 'top top',
          end: scrollLength,
          pin: true,
          scrub: 3,
        },
      });
  });
  return (
    <Container className='main'>
      <nav className='logoNav' width={'100%'}>
        <Menu>
          <Menu.Item className='logo'>
            <svg className='something_logo' width={'400px'} height={'50px'}>
              <text x='50%' y='50%' className='logo__text'>
                Hello, it's CrazzyAmy.
              </text>
            </svg>
          </Menu.Item>
          <Menu.Menu position='right' className='menu menu.menu'>
            {user ? (
              <>
                <Menu.Item as={Link} to='/new-post'>
                  發表文章
                </Menu.Item>
                <Menu.Item as={Link} to='/my'>
                  會員
                </Menu.Item>
                <Menu.Item onClick={() => firebase.auth().signOut()}>
                  登出
                </Menu.Item>
              </>
            ) : (
              <Menu.Item as={Link} to='/signin'>
                註冊/登入
              </Menu.Item>
            )}
          </Menu.Menu>
        </Menu>
        {/* <div className='toggle-btn'>
          <button className='burger'></button>
        </div> */}
      </nav>
      {/* <div className='overlay'>
        <div className='overlay-menu'>
          <Menu.Menu position='right'>
            {user ? (
              <>
                <Menu.Item as={Link} to='/new-post'>
                  <p>發表文章</p>
                </Menu.Item>
                <Menu.Item as={Link} to='/my'>
                  <p>會員</p>
                </Menu.Item>
                <Menu.Item onClick={() => firebase.auth().signOut()}>
                  <p>登出</p>
                </Menu.Item>
              </>
            ) : (
              <Menu.Item as={Link} to='/signin'>
                <p>註冊/登入</p>
              </Menu.Item>
            )}
          </Menu.Menu>
        </div>
      </div> */}
      <div className='something1'>
        {/* <p>Horizontal Scroll</p> */}
        <svg className='something' width={'600px'} height={'200px'}>
          <text x='50%' y='50%' className='logo__text'>
            Hello, it's CrazzyAmy.
          </text>
        </svg>
        <Grid className='main_grid'>
          <Grid.Row>
            <Grid.Column width={3}>
              <Topics />
            </Grid.Column>
            <Grid.Column width={13}>
              <Item.Group>
                {posts.map((post, index) => {
                  console.log(`${index}`);
                  return (
                    <Item
                      key={post.id}
                      as={Link}
                      to={`/posts/${post.id}`}
                      height={'300px'}
                      className='postItem'
                    >
                      <Item.Image
                        size='small'
                        src={
                          post.imageUrl ||
                          'https://react.semantic-ui.com/images/wireframe/image.png'
                        }
                        width={4}
                      />
                      <Item.Content width={12}>
                        <Item.Meta>
                          {post.author.photoURL ? (
                            <Image src={post.author.photoURL} />
                          ) : (
                            <Icon name='user circle' />
                          )}
                          {post.topic}，{post.author.displayName || '使用者'}
                        </Item.Meta>
                        <Item.Header>{post.title}</Item.Header>
                        <Item.Description className='postItem_content'>
                          {post.content}
                        </Item.Description>
                        <Item.Extra>
                          留言 {post.commentsCount || 0}，讚{' '}
                          {post.likeBy?.length || 0}
                        </Item.Extra>
                      </Item.Content>
                    </Item>
                  );
                  // return <p key={`${index}`}>{post.title}</p>;
                })}
              </Item.Group>
            </Grid.Column>
            {/* <Grid.Column width={3}>空白</Grid.Column> */}
          </Grid.Row>
        </Grid>
        {/* <Banner /> */}
        {/* <svg className='something'></svg> */}
        {/* {Example} */}
      </div>
      <div className='galleryWrapper'>
        <div className='gallery'>
          <button id='myButton' onClick={handleClick_1}>
            <h2>About Me</h2>
          </button>
          <button id='myButton_2' onClick={handleClick_2}>
            <h2>React Article</h2>
          </button>
          <button id='myButton_2' onClick={handleClick_2}>
            <h2>FOOD</h2>
          </button>
          <button id='myButton_2' onClick={handleClick_2}>
            <h2>TRAVEL</h2>
          </button>
          <button id='myButton_2' onClick={handleClick_2}>
            <h2>MOVIE</h2>
          </button>
        </div>
      </div>
      <div className='something2'></div>
      <div className='animateme'>
        <ul className='bg-bubbles'>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <script src='https://unpkg.co/gsap@3/dist/gsap.min.js'></script>
      <script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/gsap.min.js'></script>
      <script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/ScrollTrigger.min.js'></script>
    </Container>
  );
}
export default Main;
