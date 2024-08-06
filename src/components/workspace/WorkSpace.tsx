'use client';
import './workspace.css';
import axios from 'axios';
import AWS from 'aws-sdk';
import Image from 'next/image';
import EmptyImage from '../../public/images/score.png';
import { useState, useCallback } from 'react';

export default function WorkSpace() {
  const [scoreImage, setScoreImage] = useState('');
  const getTest = async () => {
    await axios
      .get('http://localhost:8000/test')
      .then(() => alert('get 요청 성공'))
      .catch((err) => console.error(err));
  };
  const postTest = async () => {
    await axios
      .post('http://localhost:8000/test', { testMsg: 'testMsg!!!' })
      .then(() => alert('post 요청 성공'))
      .catch((err) => console.error(err));
  };

  const onFileUpload = async (e: any, setScoreImage: any) => {
    try {
      const file = e.target.files[0];
      if (!file) return;
      setScoreImage('');

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        if (reader.readyState === 2) {
          const imgUrl = e.target.result;
          setScoreImage(imgUrl);
        }
      };
    } catch (err) {
      console.log('image upload error : ', err);
    }
  };

  const handleScoreImage = (e: any) => {
    onFileUpload(e, setScoreImage);
  };

  return (
    <>
      <div className="workspace-wrap">
        <div className="work-1-wrap">
          <div className="work-1-container">
            <p>이미지를 업로드 해주세요</p>
            <input type="file" onChange={handleScoreImage} />
          </div>
          <div className="work-1-image-wrap">
            <Image
              // src={EmptyImage as string}
              src={scoreImage === '' ? (EmptyImage as string) : scoreImage}
              alt="빈 악보"
              width={500}
              height={500}
              // layout="fill"
              // sizes="100%"
            />
          </div>
        </div>
        <div className="work-2-wrap">
          <div className="work-2-container">결과</div>
        </div>
      </div>
      {/*<div>*/}
      {/*  <button onClick={getTest}>GET</button>*/}
      {/*  <button onClick={postTest}>POST</button>*/}
      {/*</div>*/}
    </>
  );
}

// function onFileUpload(e) {
//   const ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY;
//   const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
//   const REGION = process.env.NEXT_PUBLIC_AWS_REGION;
//   const S3_BUCKET = process.env.NEXT_PUBLIC_AWS_S3_BUCKET;
//
//   // AWS ACCESS KEY를 세팅합니다.
//   AWS.config.update({
//     accessKeyId: ACCESS_KEY,
//     secretAccessKey: SECRET_ACCESS_KEY,
//   });
//
//   // 버킷에 맞는 이름과 리전을 설정합니다.
//   const myBucket = new AWS.S3({
//     params: { Bucket: S3_BUCKET },
//     region: REGION,
//   });
//
//   const file = e.target.files[0];
//
//   // 파일과 파일이름을 넘겨주면 됩니다.
//   const params = {
//     ACL: 'public-read',
//     Body: file,
//     Bucket: S3_BUCKET,
//     Key: file.name,
//   };
//
//   myBucket
//     .putObject(params)
//     .on('httpUploadProgress', (evt) => {
//       alert('SUCCESS');
//     })
//     .send((err) => {
//       if (err) console.log(err);
//     });
// }
