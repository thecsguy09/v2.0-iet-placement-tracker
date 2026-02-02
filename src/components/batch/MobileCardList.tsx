import { PlacementRecord } from '@/types/placement';
import MobileCompanyCard from './MobileCompanyCard';

interface MobileCardListProps {
  data: PlacementRecord[];
}

const MobileCardList = ({ data }: MobileCardListProps) => {
  return (
    <div className="space-y-4">
      <p className="text-center text-sm text-muted-foreground">
        Tap a card to view all details
        <span className="block text-xs mt-1">(for better usage, view on laptop)</span>
      </p>
      {data.map((record, index) => (
        <MobileCompanyCard key={record['S.No.'] || index} record={record} />
      ))}
      {data.length === 0 && (
        <div className="flex h-32 items-center justify-center rounded-lg border text-muted-foreground">
          No placement records available.
        </div>
      )}
    </div>
  );
};

export default MobileCardList;
