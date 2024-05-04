import { set } from 'react-ga';
import { firebase } from '../utils/firebase';
import React from 'react';
import { List } from 'semantic-ui-react';
import 'firebase/compat/firestore';
function Topics() {
  const [topics, setTopics] = React.useState([]);
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
  return (
    <List animated selection>
      {topics.map((topic) => {
        return <List.Item key={topic.name}>{topic.name}</List.Item>;
      })}
    </List>
  );
}
export default Topics;
