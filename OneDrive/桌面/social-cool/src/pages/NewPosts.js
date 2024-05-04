import React from 'react';
import HeaderBar from '../Header';
import { Container, Header, Form, Image, Button } from 'semantic-ui-react';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { firebase } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { set } from 'react-ga';

function NewPosts() {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [topics, setTopics] = React.useState([]);
  const [topicName, setTopicName] = React.useState('');
  const [file, setFile] = React.useState(null);
  const [contentfile, setContentFile] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    firebase
      .firestore()
      .collection('topic')
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return doc.data();
        });
        setTopics(data);
        console.log(data);
        // snapshot.forEach((doc) => {
        //     console.log(doc.id, doc.data());
        // });
      });
  }, []);
  const options = Array.isArray(topics)
    ? topics.map((topics) => {
        return {
          text: topics.name,
          value: topics.name,
        };
      })
    : [];
  const previewUrl = file
    ? URL.createObjectURL(file)
    : 'https://react.semantic-ui.com/images/wireframe/image.png';
  const previewContentUrl = file
    ? URL.createObjectURL(file)
    : 'https://react.semantic-ui.com/images/wireframe/image.png';
  function onSubmit() {
    setIsLoading(true);
    const documentRef = firebase.firestore().collection('posts').doc();
    const fileRef = firebase.storage().ref(`/post-Images/${documentRef.id}`);
    const contentfileRef = firebase
      .storage()
      .ref(`/post-Images/${documentRef.id}`);
    const metadata = {
      contentType: file.type,
    };
    if (firebase.auth().currentUser) {
      contentfileRef.put(contentfile, metadata).then(() => {
        contentfileRef.getDownloadURL().then((imageContentUrl) => {
          fileRef.put(file, metadata).then(() => {
            fileRef.getDownloadURL().then((imageUrl) => {
              documentRef
                .set({
                  title,
                  content,
                  topic: topicName,
                  createdAt: firebase.firestore.Timestamp.now(),
                  author: {
                    displayName: firebase.auth().currentUser.displayName || '',
                    photoURL: firebase.auth().currentUser.photoURL || '',
                    uid: firebase.auth().currentUser.uid,
                    email: firebase.auth().currentUser.email,
                  },
                  imageUrl,
                  imageContentUrl,
                })
                .then(() => {
                  setIsLoading(false);
                  navigate('/');
                });
            });
          });
        });
      });
    } else {
      alert('請先登入');
      setIsLoading(false);
    }
  }
  return (
    <Container>
      <HeaderBar />
      <Header>發表文章</Header>
      <Form onSubmit={onSubmit}>
        <Image src={previewUrl} size='small' floated='left' />
        <Button basic as='label' htmlFor='post-image'>
          上傳文章圖片
        </Button>
        <Form.Input
          type='file'
          id='post-image'
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Form.Input
          placeholder='輸入文章標題'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Form.TextArea
          placeholder='輸入文章內容'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Image src={previewContentUrl} size='small' floated='left' />
        <Button basic as='label' htmlFor='post-image-content'>
          上傳內文圖片
        </Button>
        <Form.Input
          type='file'
          id='post-image-content'
          style={{ display: 'none' }}
          onChange={(e) => setContentFile(e.target.files[0])}
        />
        <Form.Dropdown
          placeholder='選擇文章主題'
          options={options}
          value={topicName}
          onChange={(e, { value }) => setTopicName(value)}
          selection
        />
        <Form.Button loading={isLoading}>送出</Form.Button>
      </Form>
    </Container>
  );
}
export default NewPosts;
