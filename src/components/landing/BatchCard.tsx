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
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={isActive ? { scale: 1.02, backgroundColor: "rgba(59, 130, 246, 0.1)" } : {}}
      whileTap={isActive ? { scale: 0.98 } : {}}
      onClick={handleClick}
      className={`relative cursor-pointer px-8 py-4 rounded-xl flex items-center gap-3
        backdrop-blur-sm transition-colors duration-300 w-full
        ${isActive
          ? 'bg-white/5 border-white/10 hover:border-white/20 text-white'
          : 'bg-white/5 border-white/10 opacity-60 cursor-not-allowed text-white/60'}
        border-2 shadow-lg shadow-black/10`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="text-left">
          <h3 className="text-base font-medium">{batch.label}</h3>
          <p className="text-xs text-blue-200/60 mt-0.5">{batch.description}</p>
        </div>
        <div className="flex items-center gap-2">
          {isActive ? (
            <span className="status-badge status-badge-active text-xs">Active</span>
          ) : (
            <span className="status-badge status-badge-coming text-xs">
              <Clock className="h-3 w-3" />
              Soon
            </span>
          )}
          {isActive && (
            <motion.div
              initial={{ x: 0 }}
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ArrowRight className="w-5 h-5 text-blue-200" />
            </motion.div>
          )}
        </div>
      </div>
    </motion.button>
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
