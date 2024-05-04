import { Menu, Search } from 'semantic-ui-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { firebase, auth, firestore } from './utils/firebase';

function Header() {
  const [user, setUser] = useState(null);
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      console.log('Header unmounted');
    });
  }, []);
  // return <Menu />;
  return (
    <Menu>
      <Menu.Item as={Link} to='/'>
        CrazzyAmy's Blog
      </Menu.Item>
      <Menu.Item>
        <Search />
      </Menu.Item>
      <Menu.Menu position='right'>
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
  );
}
export default Header;
