import React from 'react';
import { Link } from 'react-router-dom';

export default function PublicFooter() {
  return (
    <footer className="border-t border-border/40 bg-white px-4 py-6 md:hidden">
      <div className="mx-auto flex max-w-md flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-xs font-medium text-muted-foreground">© {new Date().getFullYear()} RUNNA</p>
        <nav className="flex items-center gap-4" aria-label="Public pages">
          <Link to="/about" className="text-xs font-medium text-foreground transition-colors hover:text-primary">
            About
          </Link>
          <Link to="/contact" className="text-xs font-medium text-foreground transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
