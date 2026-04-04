import { Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '@/assets/logo.png';

const Header = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-md"
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
          <img src={logo} alt="IET DAVV Logo" className="h-10 w-10 rounded-md object-contain sm:h-12 sm:w-12" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground sm:text-lg">IET DAVV Placement Tracker</span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-muted-foreground sm:block">Made by Kunal Bang</span>
          <div className="flex items-center gap-2">
            <a
              href="https://linkedin.com/in/kunalbang"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-accent"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:thecsguy09@gmail.com"
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-accent"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
