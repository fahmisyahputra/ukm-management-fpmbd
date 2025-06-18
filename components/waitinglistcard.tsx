// app/components/WaitingListCard.tsx
import Image from 'next/image';
import type { Applicant } from '@/lib/types'; // Adjust path if needed

interface WaitingListCardProps {
  applicant: Applicant;
}

export default function WaitingListCard({ applicant }: WaitingListCardProps) {
  return (
    <div className="flex-1 overflow-hidden rounded-lg ring-1 ring-white">
      <Image
        src={applicant.imageUrl}
        alt={`Photo of ${applicant.name}`}
        width={250}
        height={240}
        className="h-60 w-full object-cover"
      />
      <div className="p-3">
        <p className="text-sm text-gray-300">{applicant.year}</p>
        <h4 className="truncate text-lg font-medium" title={applicant.name}>
          {applicant.name}
        </h4>
      </div>
    </div>
  );
}