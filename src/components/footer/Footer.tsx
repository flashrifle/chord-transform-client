'use client';
import './footer.css';
import Github from '@/public/icons/github';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();
  return (
    <>
      <div className="footer-container">
        <div className="footer-copy-text">
          <p>Copyright 2024. flashrifle. All rights reserved.</p>
        </div>
        <ul className="footer-content">
          <li onClick={() => router.push('https://github.com/flashrifle')}>
            <Github />
          </li>
        </ul>
      </div>
    </>
  );
}
