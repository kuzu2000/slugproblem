import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useEffect } from 'react';


export async function getStaticPaths() {
  const snapshot = await getDocs(collection(db, 'todos'));
  const paths = snapshot.docs.map((doc) => {
    const { slug } = doc.data();
    return {
      params: { slug }
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const docRef = doc(db, 'todos', slug);
  const docSnap = await getDoc(docRef);

  return {
    props: { todoProps: JSON.stringify(docSnap.data()) || null },
  };
}



export default function PostDetail({ todoProps }) {
  console.log(todoProps);
  const todo = JSON.parse(todoProps);
  console.log(todo);
  return <div>{todo?.title}</div>;
}
