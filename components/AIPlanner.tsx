"use client";

import React, { useState } from 'react';
import { generateEventConceptAction } from '../app/actions';
import { Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { AIPlanningResult } from '../types';

const AIPlanner: React.FC = () => {
  const [client, setClient] = useState('');
  const [eventType, setEventType] = useState('');
  const [vibe, setVibe] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIPlanningResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!client || !eventType || !vibe) return;

    setLoading(true);
    setResult(null);
    try {
      const data = await generateEventConceptAction(client, eventType, vibe);
      setResult(data);
    } catch (err) {
      alert("Something went wrong with the AI Director. Please check your API Key or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-planner" className="py-24 bg-brand-dark border-t border-white/5 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-[100px] -z-10"></div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left: Input */}
          <div className="lg:w-1/3">
            <div className="flex items-center gap-2 mb-6">
                <Sparkles className="text-brand-accent" />
                <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider">
                  AI Creative Director
                </h2>
            </div>
            <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                Need a quick concept? Let our AI engine brainstorm the initial direction for your next big event.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Client / Brand</label>
                <input 
                  type="text" 
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="e.g. Porsche Korea"
                  className="w-full bg-black/50 border border-white/10 p-4 text-white focus:border-brand-accent focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Event Type</label>
                <select 
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 p-4 text-white focus:border-brand-accent focus:outline-none transition-colors appearance-none"
                >
                    <option value="">Select Type</option>
                    <option value="Product Launch">Product Launch</option>
                    <option value="Pop-up Store">Pop-up Store</option>
                    <option value="Music Festival">Music Festival</option>
                    <option value="Corporate Party">Corporate Party</option>
                    <option value="Exhibition">Exhibition</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Desired Vibe</label>
                <input 
                  type="text" 
                  value={vibe}
                  onChange={(e) => setVibe(e.target.value)}
                  placeholder="e.g. Cyberpunk, Minimalist, High-Energy"
                  className="w-full bg-black/50 border border-white/10 p-4 text-white focus:border-brand-accent focus:outline-none transition-colors"
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-bold py-4 hover:bg-brand-accent transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'GENERATE CONCEPT'}
              </button>
            </form>
          </div>

          {/* Right: Output */}
          <div className="lg:w-2/3 bg-black border border-white/10 p-8 md:p-12 min-h-[500px] relative">
            {!result && !loading && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-700 font-display text-4xl uppercase opacity-20 select-none">
                    Waiting for input...
                </div>
            )}
            
            {loading && (
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-brand-accent text-sm font-mono animate-pulse">ANALYZING TRENDS...</span>
                    </div>
                 </div>
            )}

            {result && !loading && (
                <div className="animate-fade-in space-y-8">
                    <div className="border-b border-white/10 pb-6">
                        <span className="text-brand-accent font-mono text-sm mb-2 block">PROJECT CODENAME</span>
                        <h3 className="text-4xl md:text-5xl font-display font-bold text-white uppercase">{result.conceptName}</h3>
                        <p className="text-xl md:text-2xl text-gray-300 font-light mt-2 italic">"{result.slogan}"</p>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Atmosphere</h4>
                        <p className="text-gray-300 leading-relaxed">{result.description}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Key Visuals</h4>
                            <ul className="space-y-2">
                                {result.keyVisualIdeas.map((idea, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                                        <ArrowRight size={16} className="text-brand-accent mt-1 shrink-0" />
                                        {idea}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Program Flow</h4>
                            <ul className="space-y-2">
                                {result.programFlow.map((step, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                                        <span className="text-brand-accent font-mono text-xs mt-1 shrink-0">0{i+1}</span>
                                        {step}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIPlanner;