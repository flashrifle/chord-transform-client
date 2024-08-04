'use client';
import AWS from 'aws-sdk';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import WorkSpace from '@/components/workspace/WorkSpace';

export default function Home() {
  return (
    <>
      <Header />
      <WorkSpace />
      <Footer />
    </>
  );
}
