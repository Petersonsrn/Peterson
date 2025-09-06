import React from 'react';

export const CookingSpinner: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 15v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3" />
    <path d="M4 15h16" />
    <path d="M16 11V7a4 4 0 0 0-8 0v4" />
    <path className="animate-steam" d="M8 5s0-2 2-2 2 2 2 2" style={{ animationDelay: '0s' }} />
    <path className="animate-steam" d="M14 5s0-2 2-2 2 2 2 2" style={{ animationDelay: '0.5s' }} />
  </svg>
);
