import { Space_Grotesk, Outfit, Space_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import NavWrapper from '@/components/Navigation'; // 기존 Navigation 컴포넌트 활용

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const spaceMono = Space_Mono({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: "Movie Archive | System Analysis",
  description: "Advanced cinematic data analysis platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`dark ${spaceGrotesk.variable} ${outfit.variable} ${spaceMono.variable}`}>
      <body className="bg-[#050505] text-gray-200 antialiased selection:bg-teal-500/30 font-outfit">
        <div className="min-h-screen flex flex-col relative">
          {/* 플로팅 네비게이션 사용 (layout 내 중복 제거) */}
          <NavWrapper />

          <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
            {children}
          </main>
          
          {/* Subtle Scanline Overlay */}
          <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%] opacity-20"></div>
        </div>
      </body>
    </html>
  );
}
