import { useState, useEffect, useRef, useCallback } from 'react';
import { PlacementRecord } from '@/types/placement';
import MobileCompanyCard from './MobileCompanyCard';
import { Loader2 } from 'lucide-react';

interface MobileCardListProps {
  data: PlacementRecord[];
}

const ITEMS_PER_PAGE = 10;

const MobileCardList = ({ data }: MobileCardListProps) => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const hasMore = visibleCount < data.length;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    // Small delay for smooth UX
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, data.length));
      setIsLoading(false);
    }, 300);
  }, [isLoading, hasMore, data.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loadMore, hasMore]);

  // Reset visible count when data changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [data]);

  const visibleData = data.slice(0, visibleCount);

  return (
    <div className="space-y-4">
      <p className="text-center text-sm text-muted-foreground">
        Tap a card to view all details
        <span className="block text-xs mt-1">(for better usage, view on laptop)</span>
      </p>
      
      {visibleData.map((record, index) => (
        <MobileCompanyCard key={record['S.No.'] || index} record={record} />
      ))}
      
      {/* Infinite scroll loader */}
      {hasMore && (
        <div ref={loaderRef} className="flex justify-center py-4">
          {isLoading && (
            <Loader2 className="h-6 w-6 animate-spin text-accent" />
          )}
        </div>
      )}
      
      {!hasMore && data.length > ITEMS_PER_PAGE && (
        <p className="text-center text-xs text-muted-foreground py-2">
          All {data.length} records loaded
        </p>
      )}
      
      {data.length === 0 && (
        <div className="flex h-32 items-center justify-center rounded-lg border text-muted-foreground">
          No placement records available.
        </div>
      )}
    </div>
  );
};

export default MobileCardList;
