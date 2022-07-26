import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import Metatags from '../components/Metatags';
import { db } from '../lib/firebase';
import { useAuth } from '../lib/context';

export default function Create() {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');

  const router = useRouter();
  const { currentUser } = useAuth();

  const slug = encodeURI(kebabCase(title));
  const addTodo = async () => {
    const uid = currentUser?.uid
    const username = currentUser?.email?.split('@')[0];
    const collectionRef = collection(db, 'todos');
    await addDoc(collectionRef, {
      uid,
      username,
      title,
      slug,
      detail,
      createdAt: serverTimestamp(),
      heartCount: 0,
    });
    toast.success('Post created!');
    router.push('/');
  };

  return (
    <div className="popup">
      <Metatags
        title="Create Page"
        description="Post at this app to contribute"
      />
      <div className="closePopup">X</div>
      <div className="content">
        <h3>Add Task</h3>
        <input
          type="text"
          className="add-todo-input"
          placeholder="Title..."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <textarea
          placeholder="Description..."
          style={{ resize: 'none' }}
          className="add-todo-input"
          onChange={(e) => setDetail(e.target.value)}
          value={detail}
        ></textarea>
        <div className="button" onClick={addTodo}>
          Create Task
        </div>
      </div>
    </div>
  );
}
