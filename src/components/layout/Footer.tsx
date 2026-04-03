import { Linkedin, Mail } from 'lucide-react';
import logo from '@/assets/logo.png';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/30 backdrop-blur-md">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <img src={logo} alt="IET DAVV Logo" className="h-10 w-10 rounded-md" />
            <div className="text-center sm:text-left">
              <p className="font-semibold text-foreground">IET DAVV Placement Data</p>
              <p className="text-xs text-muted-foreground">Institute of Engineering & Technology, DAVV Indore</p>
              <p className="text-sm text-muted-foreground">Made by Kunal Bang</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com/in/kunalbang"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:thecsguy09@gmail.com"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
