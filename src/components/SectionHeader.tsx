'use client';

interface Props {
  title: string;
  type: 'main' | 'sub';
}

export default function SectionHeader({ title, type }: Props) {
  if (type === 'main') {
    return (
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h2 className="text-2xl font-black text-teal-400 border-l-4 border-teal-500 pl-4 tracking-tighter uppercase flex items-center gap-3">
          {title}
        </h2>
        <div className="hidden md:block text-[10px] font-mono text-gray-600 tracking-[0.2em] uppercase">
          System_Status: Active_Log
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 mb-8">
      <h3 className="text-xs font-black text-teal-500/60 uppercase tracking-[0.3em] whitespace-nowrap">
        {title}
      </h3>
      <div className="flex-1 h-[1px] bg-gray-800/50"></div>
    </div>
  );
}