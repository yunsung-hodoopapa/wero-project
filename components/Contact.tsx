import React from 'react';
import { MapPin, Mail, ArrowUpRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <footer id="contact" className="bg-brand-black text-white pt-24 pb-8 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            {/* Left: CTA */}
            <div className="flex flex-col justify-between">
                <div>
                    <h2 className="text-6xl md:text-8xl font-display font-bold uppercase tracking-tighter mb-8 leading-none">
                        Let's <br/> Start <span className="text-brand-accent">Execution.</span>
                    </h2>
                    <p className="text-gray-400 max-w-md text-lg">
                        Ready to prove results in the field? <br/>
                        Contact us for a partnership built on trust and action.
                    </p>
                </div>
                
                <div className="mt-12">
                     <a href="mailto:master@bbpartners.co.kr" className="inline-flex items-center gap-4 text-2xl md:text-3xl font-bold hover:text-brand-accent transition-colors group">
                        master@bbpartners.co.kr
                        <ArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                     </a>
                </div>
            </div>

            {/* Right: Info */}
            <div className="bg-white/5 p-8 md:p-12 border border-white/10">
                <div className="space-y-12">
                    <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">ADDRESS</h4>
                        <div className="flex items-start gap-3">
                            <MapPin className="text-brand-accent shrink-0 mt-1" size={20} />
                            <p className="text-xl leading-relaxed">
                                123 Creative Avenue, Gangnam-gu,<br/>Seoul, South Korea
                            </p>
                        </div>
                    </div>
                    
                    <div>
                         <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">INQUIRIES</h4>
                         <div className="flex items-start gap-3">
                            <Mail className="text-brand-accent shrink-0 mt-1" size={20} />
                            <div>
                                <p className="text-xl font-medium">master@bbpartners.co.kr</p>
                                <p className="text-sm text-gray-500 mt-2">Response within 24 hours.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Footer Logo */}
            <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                 <svg width="36" height="24" viewBox="0 0 50 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 2V22" stroke="white" strokeWidth="6" strokeLinecap="round" />
                    <path d="M36 2V22" stroke="white" strokeWidth="6" strokeLinecap="round" />
                    <path 
                        d="M10 22 C 10 32, 23 32, 23 22 C 23 12, 36 12, 36 22 C 36 32, 23 32, 23 22 C 23 12, 10 12, 10 22" 
                        stroke="#FFAB00" 
                        strokeWidth="5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />
                </svg>
                <span className="font-display font-bold text-xl text-white">
                    partners
                </span>
            </div>
            <p className="text-xs text-gray-600 uppercase tracking-widest">
                © 2025 BB PARTNERS. All Rights Reserved.
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;