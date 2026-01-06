import React from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-brand-black">
      {/* Background Image - Dark Luxury Texture/Car Event Vibe */}
      <div className="absolute inset-0 w-full h-full opacity-50">
        <img 
            src="https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2070&auto=format&fit=crop" 
            alt="Dark Luxury Texture" 
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-brand-black"></div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,171,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,171,0,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center md:text-left">
        <div className="inline-block mb-6 px-4 py-2 border border-brand-accent/50 text-brand-accent text-sm font-bold tracking-[0.2em] uppercase bg-brand-accent/5 backdrop-blur-sm">
          Best Brand Partner
        </div>
        
        <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl leading-tight tracking-tighter text-white mb-8">
          WE NEVER <br />
          SAY <span className="text-brand-accent">NO.</span>
        </h1>
        
        <p className="font-display text-3xl md:text-5xl text-white font-medium tracking-wide mb-12 md:ml-2">
          JUST <span className="italic font-light text-gray-400">EXECUTION.</span>
        </p>

        <div className="flex flex-col md:flex-row gap-4 md:ml-2">
            <a href="#about" className="group relative px-8 py-4 bg-brand-accent text-black font-bold tracking-wider hover:bg-white transition-colors duration-300">
                DISCOVER OUR DNA
                <div className="absolute inset-0 border border-brand-accent translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300 pointer-events-none"></div>
            </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown className="text-white" size={24} />
      </div>
    </section>
  );
};

export default Hero;