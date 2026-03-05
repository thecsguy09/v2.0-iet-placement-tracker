import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="gradient-hero py-16 md:py-24">
      <div className="container text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
        >
          Placement Data Dashboard
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
        >
          Verified campus recruitment data from IET DAVV.
          <br className="hidden sm:block" />
          Track companies, packages, and hiring trends across batches.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
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
