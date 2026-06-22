import React from 'react';
import { Link } from 'react-router-dom';

export default function PublicFooter() {
  return (
    <footer className="bg-white border-t border-border/40 px-4 py-6 mt-4">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <p className="text-xs text-muted-foreground font-medium">© {new Date().getFullYear()} RUNNA</p>
        <nav className="flex items-center gap-4">
          <Link to="/about" className="text-xs font-medium text-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-xs font-medium text-foreground hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}