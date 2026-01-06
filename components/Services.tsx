import React from 'react';
import { Lightbulb, Car, UserCheck, Armchair } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Lightbulb size={40} />,
      title: "EXPERIENTIAL / CONTENTS",
      items: [
        "Concept, Design and execution of immersive brand experiences",
        "Brand partnership / Celebrity & Influencer communication",
        "Social media marketing / Digital contents creation"
      ],
      img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop"
    },
    {
      icon: <Car size={40} />,
      title: "VEHICLE MANAGEMENT",
      items: [
        "Professional logistics",
        "Car detailing / Showcase setting",
        "Company vehicle management"
      ],
      img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop"
    },
    {
      icon: <UserCheck size={40} />,
      title: "PROFESSIONAL STAFFING",
      items: [
        "Brand Experience & Operation staff",
        "VIP Chauffeur / Premium Valet",
        "Executive Protection / Driving Instructor"
      ],
      img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop"
    },
    {
      icon: <Armchair size={40} />,
      title: "RENTAL SERVICE",
      items: [
        "Digital devices",
        "Luxury furniture rental for events"
      ],
      img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <section id="services" className="py-24 bg-brand-dark relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white uppercase tracking-tighter">
                Our <br/><span className="text-brand-accent">Business</span>
            </h2>
            <p className="text-gray-400 max-w-sm mt-6 md:mt-0 pb-2 text-right">
                We provide comprehensive solutions from planning to field execution.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((s, idx) => (
                <div key={idx} className="group relative min-h-[400px] overflow-hidden bg-brand-black border border-white/5 flex flex-col">
                    {/* Background Image on Hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                        <img src={s.img} alt={s.title} className="w-full h-full object-cover grayscale" />
                    </div>
                    
                    <div className="relative z-10 p-10 flex flex-col h-full justify-between">
                        <div className="flex justify-between items-start">
                            <div className="text-brand-accent bg-brand-accent/10 p-4 rounded-full mb-6">
                                {s.icon}
                            </div>
                            <span className="text-white/20 font-display text-4xl font-bold">0{idx + 1}</span>
                        </div>
                        
                        <div>
                            <h3 className="text-2xl font-display font-bold text-white mb-6 group-hover:text-brand-accent transition-colors">
                                {s.title}
                            </h3>
                            <ul className="space-y-2">
                                {s.items.map((item, i) => (
                                    <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 bg-brand-accent mt-1.5 rounded-full shrink-0"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Services;