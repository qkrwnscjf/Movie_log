import './globals.css';
import NavWrapper from '@/components/Navigation';

export const metadata = {
  title: "My Movie Log",
  description: "Simple & Smart Movie Review Archive",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const theme = localStorage.getItem('theme');
              if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            })()
          `
        }} />
      </head>
      <body className="antialiased selection:bg-blue-500/20">
        <div className="min-h-screen flex flex-col relative">
          <NavWrapper />
          <main className="flex-1 w-full max-w-5xl mx-auto px-6 pt-16 pb-40">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}