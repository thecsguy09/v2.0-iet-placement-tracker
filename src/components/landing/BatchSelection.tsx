import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BatchCard from './BatchCard';
import { BatchInfo, BatchesData } from '@/types/placement';

const BatchSelection = () => {
  const [batches, setBatches] = useState<BatchInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await fetch('/data/batches.json');
        const data: BatchesData = await response.json();
        setBatches(data.batches);
      } catch (error) {
        console.error('Error fetching batches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBatches();
  }, []);

  if (loading) {
    return (
      <section className="py-16">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 animate-pulse rounded-xl bg-secondary" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl"
        >
          Select Batch Year
        </motion.h2>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {batches.map((batch, index) => (
            <BatchCard key={batch.year} batch={batch} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BatchSelection;
