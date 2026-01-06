import React from 'react';

const Marquee: React.FC = () => {
  return (
    <div className="relative flex overflow-x-hidden bg-brand-accent py-5 text-brand-black border-y border-black">
      <div className="animate-marquee whitespace-nowrap flex gap-12">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tighter flex items-center gap-12">
            <span>We never say no</span>
            <span className="text-transparent stroke-text" style={{WebkitTextStroke: '1px #000'}}>Just execution</span>
            <span>•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;