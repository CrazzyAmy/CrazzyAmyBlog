import React from 'react';
import HeaderBar from '../Header';
import {
  Container,
  Grid,
  Segment,
  Header,
  Icon,
  Image,
  Comment,
  Form,
} from 'semantic-ui-react';
import Topics from '../components/Topics';
import { auth, firebase } from '../utils/firebase';
import { useParams, useNavigate } from 'react-router-dom';
function Post() {
  const { postId } = useParams();
  const [post, setPost] = React.useState({
    author: {},
  }); // [post, setPost
  const [commentsContent, setCommentsContent] = React.useState(''); // [commentsContent, setCommentsContent]
  const [isLoading, setIsLoading] = React.useState(false);
  const [comments, setComments] = React.useState([]); // [comments, setComments
  React.useEffect(() => {
    firebase
      .firestore()
      .collection('posts')
      .doc(postId)
      .onSnapshot((docSnapshot) => {
        const data = docSnapshot.data();
        setPost(data);
      });

    //   .get()
    //   .then((docSnapshot) => {
    //     const data = docSnapshot.data();
    //     setPost(data);
    //   });
  }, []);
  // 此處的監聽，會在留言數量有變動時，重新取得留言資料
  React.useEffect(() => {
    firebase
      .firestore()
      .collection('posts')
      .doc(postId) //取得這篇文章
      .collection('comments') //取得comments子集合
      .orderBy('createdAt', 'desc') //desc是由新到舊作時間排序
      .onSnapshot((snapshot) => {
        //snapshot是一個集合
        const data = snapshot.docs.map((doc) => {
          return doc.data();
        });
        setComments(data);
      });
  });
  //
  function toggle(isActive, field) {
    if (firebase.auth().currentUser) {
      const uid = firebase.auth().currentUser.uid;
      firebase
        .firestore()
        .collection('posts')
        .doc(postId)
        .update({
          [field]: isActive
            ? firebase.firestore.FieldValue.arrayRemove(uid)
            : firebase.firestore.FieldValue.arrayUnion(uid),
        });
    } else {
      alert('請先登入1');
    }

    // if (isActive) {
    //   firebase
    //     .firestore()
    //     .collection('posts')
    //     .doc(postId)
    //     .update({
    //       [field]: firebase.firestore.FieldValue.arrayRemove(uid),
    //     });
    // } else {
    //   firebase
    //     .firestore()
    //     .collection('posts')
    //     .doc(postId)
    //     .update({
    //       [field]: firebase.firestore.FieldValue.arrayUnion(uid),
    //     });
    // }
  }

  function toggleCollected() {
    if (firebase.auth().currentUser) {
      const uid = firebase.auth().currentUser.uid || '';
      if (isCollected) {
        firebase
          .firestore()
          .collection('posts')
          .doc(postId)
          .update({
            collectedBy: firebase.firestore.FieldValue.arrayRemove(uid),
          });
      } else {
        firebase
          .firestore()
          .collection('posts')
          .doc(postId)
          .update({
            collectedBy: firebase.firestore.FieldValue.arrayUnion(uid),
          });
      }
    } else {
      alert('請先登入2');
    }
  }
  let isLike = false,
    isCollected = false;
  // if (firebase.auth().currentUser) {
  if (firebase.auth().currentUser) {
    isLike = post.likeBy?.includes(firebase.auth().currentUser.uid);
    isCollected = post.collectedBy?.includes(firebase.auth().currentUser.uid);
    // }
  } else {
    // alert('請先登入3');
  }

  // 使用到Batch，使增加留言和留言顯示同步進行
  function onsubmit() {
    setIsLoading(true);
    const firestore = firebase.firestore();
    const batch = firestore.batch();
    const postRef = firestore.collection('posts').doc(postId);
    batch.update(postRef, {
      commentsCount: firebase.firestore.FieldValue.increment(1),
    });
    const commentRef = postRef.collection('comments').doc();
    batch.set(commentRef, {
      content: commentsContent,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      author: {
        uid: auth.currentUser.uid || 'Mi8HNnsda5gj5wGDr9VX2lqGS7a2',
        displayName: firebase.auth().currentUser.displayName || '',
        photoURL: firebase.auth().currentUser.photoURL || '',
      },
    });
    batch.commit().then(() => {
      setCommentsContent('');
      setIsLoading(false);
    });
  }
  return (
    <Container>
      <HeaderBar />
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <Topics />
          </Grid.Column>
          <Grid.Column width={10}>
            {post.author.photoURL ? (
              <Image src={post.author.photoURL} />
            ) : (
              <Icon name='user circle' />
            )}
            {post.author.displayName || '使用者'}
            <Header>
              {post.title}
              <Header.Subheader>
                {post.topic}，{post.createdAt?.toDate().toLocaleString()}
              </Header.Subheader>
            </Header>
            <Image src={post.imageUrl} />
            <Segment basic vertical>
              {post.content}
            </Segment>
            <Segment basic vertical>
              留言 {post.commentsCount || 0}，讚 {post.likeBy?.length || 0}，
              <Icon
                name={`thumbs up ${isLike ? '' : 'outline'}`}
                color={isLike ? 'blue' : 'grey'}
                link
                onClick={() => toggle(isLike, 'likeBy')}
              />
              ，
              <Icon
                name={`bookmark ${isCollected ? '' : 'outline'}`}
                color={isCollected ? 'blue' : 'grey'}
                link
                onClick={() => toggle(isCollected, 'collectedBy')}
              />
            </Segment>
            <Comment.Group>
              <Form reply>
                <Form.TextArea
                  value={commentsContent}
                  onChange={(e) => setCommentsContent(e.target.value)}
                />
                <Form.Button onClick={onsubmit} loading={isLoading}>
                  留言
                </Form.Button>
              </Form>
              <Header>共{post.commentsCount || 0}則留言</Header>
              {comments.map((comment) => {
                return (
                  <Comment key={comment.createdAt}>
                    {comment.author.photoURL ? (
                      <Comment.Avatar src={comment.author.photoURL} />
                    ) : (
                      <Icon name='user circle' />
                    )}
                    <Comment.Content>
                      <Comment.Author as='span'>
                        {comment.author.displayName || '使用者'}
                      </Comment.Author>
                      <Comment.Metadata>
                        {comment.createdAt &&
                        typeof comment.createdAt.toDate === 'function'
                          ? comment.createdAt.toDate().toLocaleString()
                          : '未知時間'}
                      </Comment.Metadata>
                      <Comment.Text>{comment.content}</Comment.Text>
                    </Comment.Content>
                  </Comment>
                );
              })}
            </Comment.Group>
          </Grid.Column>
          <Grid.Column width={3}>空白</Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default Post;
