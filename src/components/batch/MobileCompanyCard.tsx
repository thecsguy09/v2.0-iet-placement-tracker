import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Building2, Briefcase, IndianRupee, GraduationCap, Users } from 'lucide-react';
import { PlacementRecord } from '@/types/placement';

interface MobileCompanyCardProps {
  record: PlacementRecord;
}

const MobileCompanyCard = ({ record }: MobileCompanyCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Prevent right-click on mobile card (scoped protection)
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  }, []);

  const formatValue = (key: string, value: string | number) => {
    if (key === 'CTC (in LPA)' && typeof value === 'number') {
      return `₹${value} LPA`;
    }
    if (key === 'Compensation in Internship' && typeof value === 'number') {
      return `₹${value.toLocaleString()}`;
    }
    return String(value);
  };

  // Primary fields shown in collapsed state
  const primaryFields = ['Company', 'Job Role', 'CTC (in LPA)', 'CGPA', 'Total Offers'];

  // Fields to hide on mobile
  const hiddenFields = ['S.No.'];

  // Get all other fields for expanded state (excluding hidden fields)
  const otherFields = Object.keys(record).filter(
    (key) => !primaryFields.includes(key) && !hiddenFields.includes(key)
  );

  return (
    <motion.div
      layout
      className={`company-card protected-content ${isExpanded ? 'company-card-expanded' : ''}`}
      onContextMenu={handleContextMenu}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left"
      >
        {/* Header with primary info */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-accent" />
              <h3 className="font-semibold text-foreground">{record['Company']}</h3>
            </div>

            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Briefcase className="h-3.5 w-3.5" />
              <span>{record['Job Role']}</span>
            </div>
          </div>

          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-muted-foreground"
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </div>

        {/* Quick stats */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {record['CTC (in LPA)'] !== undefined && record['CTC (in LPA)'] !== null && (
            <div className="flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-sm font-medium text-success">
              <span>CTC: {record['CTC (in LPA)']} LPA</span>
            </div>
          )}

          {record['CGPA'] !== undefined && record['CGPA'] !== null && (
            <div className="flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
              <GraduationCap className="h-3.5 w-3.5" />
              <span>CGPA: {record['CGPA']}</span>
            </div>
          )}

          {record['Total Offers'] !== undefined && record['Total Offers'] !== null && (
            <div className="flex items-center gap-1.5 rounded-full bg-warning/10 px-3 py-1 text-sm font-medium text-warning">
              <Users className="h-3.5 w-3.5" />
              <span>Offers: {record['Total Offers']}</span>
            </div>
          )}
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 grid gap-3 border-t pt-4">
              {otherFields.map((key) => (
                <div key={key} className="rounded-lg bg-secondary/50 p-3">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {key}
                  </p>
                  <p className="text-sm text-foreground">{formatValue(key, record[key])}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MobileCompanyCard;
