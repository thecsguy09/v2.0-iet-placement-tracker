import { useRef, useEffect, useState, useCallback } from 'react';
import { PlacementRecord } from '@/types/placement';
import MobileCompanyCard from './MobileCompanyCard';

interface MobileCardListProps {
  data: PlacementRecord[];
}

// Lazy loaded card wrapper
const LazyCard = ({ record, index }: { record: PlacementRecord; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px', threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef}>
      {isVisible ? (
        <MobileCompanyCard record={record} />
      ) : (
        <div className="h-32 animate-pulse rounded-xl bg-secondary" />
      )}
    </div>
  );
};

const MobileCardList = ({ data }: MobileCardListProps) => {
  return (
    <div className="space-y-4">
      <p className="text-center text-sm text-muted-foreground">
        Tap a card to view all details
        <span className="block text-xs mt-1">(for better usage, view on laptop)</span>
      </p>
      
      {data.map((record, index) => (
        <LazyCard key={record['S.No.'] || index} record={record} index={index} />
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
