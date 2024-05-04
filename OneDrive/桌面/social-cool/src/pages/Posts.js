import React from 'react';
import HeaderBar from '../Header';
import Topics from '../components/Topics';
import { firebase, auth, firestore } from '../utils/firebase';
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
import { Link, useNavigate } from 'react-router-dom';
function Posts() {
  const [posts, setPosts] = React.useState([]); // [posts, setPosts]
  React.useEffect(() => {
    firebase
      .firestore()
      .collection('posts')
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        setPosts(data);
      });
  }, []);
  return (
    <Container>
      <HeaderBar />
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <Topics />
          </Grid.Column>
          <Grid.Column width={10}>
            <Item.Group>
              {posts.map((post, index) => {
                console.log(`${index}`);
                return (
                  <Item key={post.id} as={Link} to={`/posts/${post.id}`}>
                    <Item.Image
                      size='small'
                      src={
                        post.imageUrl ||
                        'https://react.semantic-ui.com/images/wireframe/image.png'
                      }
                    />
                    <Item.Content>
                      <Item.Meta>
                        {post.author.photoURL ? (
                          <Image src={post.author.photoURL} />
                        ) : (
                          <Icon name='user circle' />
                        )}
                        {post.topic}，{post.author.displayName || '使用者'}
                      </Item.Meta>
                      <Item.Header>{post.title}</Item.Header>
                      <Item.Description>{post.content}</Item.Description>
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
          <Grid.Column width={3}></Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}
export default Posts;
