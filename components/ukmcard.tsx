// app/components/UkmCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import type { Ukm } from '@/lib/types';

interface UkmCardProps {
  ukm: Ukm;
  currentUserId: string; // <-- Add this prop
}

export default function UkmCard({ ukm, currentUserId }: UkmCardProps) {
  const isManager = ukm.manager.id === currentUserId;

  return (
    <div className="flex min-h-[250px] flex-1 flex-col gap-4 rounded-lg bg-[#1B4A89] p-4 text-white shadow-lg shadow-black/50 ring-1 ring-black/50 md:flex-row">
      <Image
        src={ukm.imageUrl}
        alt={`${ukm.name} Logo`}
        width={100}
        height={100}
        className="h-[100px] w-[100px] rounded-md object-cover"
      />
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-xl font-medium">{ukm.name}</h3>
        <p className="text-sm text-gray-200">{ukm.tagline}</p>
        <p className="flex-grow text-base">{ukm.description}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {ukm.tags.map((tag) => (
            <span key={tag} className="rounded bg-[#FDBB3E] px-2 py-0.5 text-xs font-normal text-black">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between">
            <div className='flex items-center gap-2'>
                 <Image src={isManager ? "/path/to/your/avatar.png" : ukm.manager.avatar} alt={ukm.manager.name} width={20} height={20} className="rounded-full" />
                 <span className="text-sm font-medium">{isManager ? "You" : ukm.manager.name}</span>
            </div>
            {isManager && (
                 <Link href={`/manager/ukms/${ukm.id}/manage`}>
                     <span className="rounded bg-[#FDBB3E] px-2 py-0.5 text-xs font-normal text-black transition-transform hover:scale-105">
                         Manage
                     </span>
                 </Link>
            )}
        </div>
      </div>
    </div>
  );
}