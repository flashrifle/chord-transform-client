'use client';
import Image from 'next/image';
import axios from 'axios';
import AWS from 'aws-sdk';

export default function Home() {
  console.log(process.env.NEXT_PUBLIC_AWS_ACCESS_KEY);
  console.log(process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY);
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
      <input type="file" onChange={onFileUpload} />
    </>
  );
}

function onFileUpload(e) {
  const ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY;
  const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
  const REGION = process.env.NEXT_PUBLIC_AWS_REGION;
  const S3_BUCKET = process.env.NEXT_PUBLIC_AWS_S3_BUCKET;

  // AWS ACCESS KEY를 세팅합니다.
  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  });

  // 버킷에 맞는 이름과 리전을 설정합니다.
  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const file = e.target.files[0];

  // 파일과 파일이름을 넘겨주면 됩니다.
  const params = {
    ACL: 'public-read',
    Body: file,
    Bucket: S3_BUCKET,
    Key: file.name,
  };

  myBucket
    .putObject(params)
    .on('httpUploadProgress', (evt) => {
      alert('SUCCESS');
    })
    .send((err) => {
      if (err) console.log(err);
    });
}
