import { Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-md"
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex flex-col">
          <span className="text-lg font-bold text-white">IET DAVV Placements</span>
          <span className="text-xs text-blue-200/70">Institute of Engineering & Technology</span>
        </Link>

        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="hidden sm:flex items-center gap-2 bg-black/20 border-2 border-white/20 rounded-full px-4 py-2 shadow-sm shadow-white/5"
          >
            <span className="text-sm text-white">
              <span className="font-medium">Made by:</span> Kunal Bang
            </span>
          </motion.div>
          <div className="flex items-center gap-2">
            <a
              href="https://linkedin.com/in/kunalbang"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-accent"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/kunalbang"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-accent"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
