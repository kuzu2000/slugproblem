import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Metatags from '../components/Metatags';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../lib/context';

export async function getStaticProps() {
  const collectionRef = collection(db, 'todos');
  const q = query(collectionRef, orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  let todos = [];
  querySnapshot.forEach((doc) => {
    todos.push({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt?.toDate().getTime(),
    });
  });
  return {
    props: {
      todoProps: JSON.stringify(todos) || [],
      revalidate: 100,
    },
  };
}

export default function Home({ todoProps }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos(JSON.parse(todoProps));
  }, [todoProps]);

  const { currentUser } = useAuth();

  return (
    <div className="App">
      <Metatags
        title="Home Page"
        description="Get the latest posts on our site"
      />

      <h1>Welcome to Blog App</h1>
      <h4>Timeline posts</h4>

      <div className="todos">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <Link key={todo.slug} href={`/posts/${todo.slug}`}>
              <div className="todo">
                <div className="text">{todo.title}</div>
                <div className="decription">{todo.detail.substr(0, 50)}...</div>
                <div className="todoInfo">
                  <div className="todoName">@{todo?.username}</div>
                  <div className="heart">💗 {todo.heartCount} Hearts</div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>You currently have no tasks</p>
        )}
      </div>

      {currentUser && <Link href="/create">
        <div className="addPopup">+</div>
      </Link>}
    </div>
  );
}
