'use client';

interface Props {
  title: string;
  type: 'main' | 'sub';
}

export default function SectionHeader({ title, type }: Props) {
  if (type === 'main') {
    return (
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">
          {title}
        </h2>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold text-[#86868b] uppercase tracking-wider">
        {title}
      </h3>
    </div>
  );
}