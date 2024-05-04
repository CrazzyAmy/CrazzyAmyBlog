import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Topics from './components/Topics';
import React, { useState } from 'react';
import Signin from './pages/Signin';
import Posts from './pages/Posts';
import NewPosts from './pages/NewPosts';
import Post from './pages/Post';
import Main from './pages/Main';
import Myself from './pages/Myself.js';
import {
  Menu,
  Form,
  Container,
  Message,
  Item,
  Image,
  Icon,
  Grid,
} from 'semantic-ui-react';
function App() {
  // return 'hello, Social Cool';
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<div>404 Not Found</div>}></Route>
          <Route path='/' element={<Main />} exact />
          <Route path='/main' element={<Main />} exact />
          <Route path='/signin' element={<Signin />} exact />
          <Route path='/new-post' element={<NewPosts />} exact />
          <Route path='/posts/:postId' element={<Post />} exact />
          <Route path='/posts' element={<Posts />} exact />
          <Route path='/myself' element={<Myself />} exact />
          {/* <Route
            path='/posts' // posts我的文章, collections我的收藏, settings帳號設定
            element={
              <Container>
                <Header />
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={3}>
                      <Topics />
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <Routes>
                        <Route path='/posts' element={<Posts />} exact />
                        <Route path='/posts/:postId' element={<Post />} exact />
                      </Routes>
                    </Grid.Column>
                    <Grid.Column width={3}></Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            }
          /> */}
          <Route
            path='/my' // posts我的文章, collections我的收藏, settings帳號設定
            element={
              <Container>
                <Header />
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={3}>會員選單</Grid.Column>
                    <Grid.Column width={10}>
                      <Routes>
                        <Route path='posts' element={'我的文章'} exact></Route>
                        <Route
                          path='collections'
                          element={'我的收藏'}
                          exact
                        ></Route>
                        <Route
                          path='settings'
                          element={'會員資料'}
                          exact
                        ></Route>
                      </Routes>
                    </Grid.Column>
                    <Grid.Column width={3}></Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            }
          />
        </Routes>
      </BrowserRouter>
      {/* <link
        rel='stylesheet'
        href='https://pro.fontawesome.com/releases/v5.10.0/css/all.css'
      /> */}
      <link
        rel='stylesheet'
        href='https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.2/css/bootstrap.min.css'
      />
    </>
  );
}

export default App;
