'use client';
import { Home, Search, Archive, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 하이드레이션 에러 방지
  useEffect(() => {
    setMounted(true);
    const root = window.document.documentElement;
    setIsDark(root.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const navItems = [
    { name: '홈', href: '/', icon: Home },
    { name: '찾기', href: '/search', icon: Search },
    { name: '보관함', href: '/archive', icon: Archive },
  ];

  // 서버 사이드 렌더링 시에는 아이콘을 렌더링하지 않음 (Hydration Match)
  if (!mounted) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] border-t border-[var(--border)] bg-[var(--bg-secondary)]/80 backdrop-blur-xl md:bottom-8 md:left-1/2 md:-translate-x-1/2 md:w-auto md:min-w-[460px] md:rounded-full md:border md:shadow-lg">
      <nav className="flex items-center justify-between p-2 px-4">
        <div className="flex items-center gap-1 md:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'text-[var(--accent)] bg-[var(--accent)]/10' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-xs md:text-sm font-bold ${isActive ? 'block' : 'hidden md:block'}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Theme Toggle Button */}
        <div className="ml-4 pl-4 border-l border-[var(--border)]">
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-full text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-all flex items-center justify-center"
            aria-label="테마 변경"
          >
            {isDark ? <Sun size={20} className="animate-in fade-in zoom-in duration-300" /> : <Moon size={20} className="animate-in fade-in zoom-in duration-300" />}
          </button>
        </div>
      </nav>
    </div>
  );
}