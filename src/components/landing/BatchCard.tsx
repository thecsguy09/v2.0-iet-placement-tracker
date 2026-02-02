import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { BatchInfo } from '@/types/placement';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface BatchCardProps {
  batch: BatchInfo;
  index: number;
}

const BatchCard = ({ batch, index }: BatchCardProps) => {
  const navigate = useNavigate();
  const isActive = batch.status === 'active';

  const handleClick = () => {
    if (isActive) {
      navigate(`/batch/${batch.year}`);
    }
  };

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={isActive ? { scale: 1.02, y: -4 } : {}}
      onClick={handleClick}
      className={`batch-card ${isActive ? 'batch-card-active' : 'batch-card-disabled'} ${
        isActive ? 'gradient-card-active' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-foreground">{batch.label}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{batch.description}</p>
        </div>

        <div className={`status-badge ${isActive ? 'status-badge-active' : 'status-badge-coming'}`}>
          {isActive ? (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              <span>Active</span>
            </>
          ) : (
            <>
              <Clock className="h-3 w-3" />
              <span>Soon</span>
            </>
          )}
        </div>
      </div>

      {isActive && (
        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent">
          <span>View Placements</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      )}
    </motion.div>
  );

  if (!isActive) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{cardContent}</TooltipTrigger>
        <TooltipContent>
          <p>Data will be available soon</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return cardContent;
};

export default BatchCard;
