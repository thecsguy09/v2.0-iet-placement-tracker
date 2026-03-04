import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-6xl font-bold text-white"
        >
          IET DAVV Placements
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-4 max-w-2xl text-lg text-blue-100 leading-tight"
        >
          Company-wise IET DAVV Indore Placement Data — 2026 Batch Onwards
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6"
        >
          <div className="trust-badge">
            <CheckCircle className="trust-badge-check" />
            <span>Verified Data</span>
          </div>
          <div className="trust-badge">
            <CheckCircle className="trust-badge-check" />
            <span>Updated Regularly</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
