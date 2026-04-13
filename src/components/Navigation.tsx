'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Insights', path: '/', icon: '📊' },
    { name: 'Archive', path: '/archive', icon: '📁' },
    { name: 'Search', path: '/search', icon: '🔍' },
  ];

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-fit">
      <nav className="flex items-center gap-2 p-2 bg-black/40 backdrop-blur-2xl rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`relative flex items-center gap-2 px-6 py-2.5 rounded-full text-[13px] font-bold tracking-tight transition-all duration-500 overflow-hidden group ${
                isActive 
                  ? 'text-teal-400' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {/* Active Background Glow */}
              {isActive && (
                <div className="absolute inset-0 bg-teal-500/10 animate-pulse"></div>
              )}
              
              <span className="relative z-10 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <span className="relative z-10 uppercase tracking-[0.1em]">{item.name}</span>
              
              {/* Active Indicator Bar */}
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-teal-500 to-transparent"></div>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}