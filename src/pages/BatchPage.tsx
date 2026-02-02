import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DataTable from '@/components/batch/DataTable';
import MobileCardList from '@/components/batch/MobileCardList';
import CompanyModal from '@/components/batch/CompanyModal';
import { PlacementRecord } from '@/types/placement';
import { useIsMobile } from '@/hooks/use-mobile';

const BatchPage = () => {
  const { year } = useParams<{ year: string }>();
  const isMobile = useIsMobile();
  const [data, setData] = useState<PlacementRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<PlacementRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [highlightHiringProcess, setHighlightHiringProcess] = useState(false);

  // Scroll to top when page loads or year changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [year]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/data/${year}.json`);

        if (!response.ok) {
          throw new Error('Data not available for this batch');
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    if (year) {
      fetchData();
    }
  }, [year]);

  const handleRowClick = (record: PlacementRecord) => {
    setSelectedRecord(record);
    setHighlightHiringProcess(false);
    setIsModalOpen(true);
  };

  const handleReadMore = (record: PlacementRecord) => {
    setSelectedRecord(record);
    setHighlightHiringProcess(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setHighlightHiringProcess(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Sticky Back link */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border/50">
          <div className="container py-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Batches
            </Link>
          </div>
        </div>

        <div className="container py-8">

          {/* Page title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 text-3xl font-bold text-foreground md:text-4xl"
          >
            Placement Data – Batch {year}
          </motion.h1>

          {/* Loading state */}
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 animate-pulse rounded-lg bg-secondary" />
              ))}
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-destructive/30 bg-destructive/5 py-16">
              <p className="text-lg font-medium text-destructive">{error}</p>
              <Link
                to="/"
                className="mt-4 text-sm text-muted-foreground hover:text-accent"
              >
                Go back to home
              </Link>
            </div>
          )}

          {/* Data display */}
          {!loading && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {isMobile ? (
                <MobileCardList data={data} />
              ) : (
                <DataTable
                  data={data}
                  onRowClick={handleRowClick}
                  onReadMore={handleReadMore}
                />
              )}

              {/* Record count */}
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Showing {data.length} placement record{data.length !== 1 ? 's' : ''}
              </p>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />

      {/* Company Modal */}
      <CompanyModal
        record={selectedRecord}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        highlightHiringProcess={highlightHiringProcess}
      />
    </div>
  );
};

export default BatchPage;
