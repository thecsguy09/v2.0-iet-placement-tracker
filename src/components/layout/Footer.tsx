import { Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t bg-secondary/30">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="font-semibold text-foreground">IET DAVV Placement Data</p>
            <p className="text-sm text-muted-foreground">Made by Kunal Bang</p>
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
              href="https://github.com/kunalbang"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
