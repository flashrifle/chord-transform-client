'use client';
import Image from 'next/image';
import styles from './page.module.css';
import axios from 'axios';
import { Simulate } from 'react-dom/test-utils';
import reset = Simulate.reset;

export default function Home() {
  const click = () => {
    console.log('!!!');
  };

  const getTest = async () => {
    await axios.get('http://localhost:8000/test').then((res) => console.log('res : ', res));
  };
  const postTest = async () => {
    await axios.post('http://localhost:8000/test', { testMsg: 'testMsg!!!' }).then((res) => console.log('res : ', res));
  };
  return (
    <>
      <h1>악보 변환 사이트</h1>
      <button onClick={getTest}>GET</button>
      <button onClick={postTest}>POST</button>
    </>
  );
}
