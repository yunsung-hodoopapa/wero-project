import React from 'react';

const Works: React.FC = () => {
  const projects = [
    {
      year: "2025",
      title: "Audi Korea X Noblesse",
      subtitle: "Nutcracker VIP Chauffeur",
      tags: ["VIP PROTOCOL", "PARTNERSHIP"],
      img: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop"
    },
    {
        year: "2025",
        title: "Audi Korea",
        subtitle: "Progressive Experience",
        tags: ["VIP CHAUFFEUR", "OPERATION"],
        // Replaced broken image link with a valid high-quality Audi image
        img: "https://images.unsplash.com/photo-1541348263662-e068662d82af?q=80&w=2070&auto=format&fit=crop"
    },
    {
      year: "2021-2023",
      title: "BMW Korea",
      subtitle: "Product Launch & Customer Events",
      tags: ["LAUNCH", "CUSTOMER EVENT"],
      img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop"
    },
    {
      year: "2019",
      title: "Nissan Korea",
      subtitle: "Seoul Motor Show",
      tags: ["MOTOR SHOW", "EXHIBITION"],
      img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop"
    },
    {
      year: "2018",
      title: "Nissan Korea",
      subtitle: "Busan Motor Show",
      tags: ["MOTOR SHOW", "EXHIBITION"],
      img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2166&auto=format&fit=crop"
    },
    {
      year: "2017",
      title: "Audi Korea",
      subtitle: "C-seg Comparative Test-drive",
      tags: ["TEST DRIVE", "EXPERIENCE"],
      img: "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?q=80&w=2128&auto=format&fit=crop"
    }
  ];

  return (
    <section id="works" className="py-24 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-16">
            <h2 className="text-xs font-bold tracking-[0.3em] text-brand-accent uppercase">
            Selected Portfolio
            </h2>
            <div className="h-px bg-white/20 flex-grow ml-8"></div>
        </div>
        

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {projects.map((project, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative aspect-[16/10] overflow-hidden mb-6 border border-white/5">
                <div className="absolute inset-0 bg-brand-accent mix-blend-color opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-10"></div>
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                />
              </div>
              
              <div className="flex flex-col border-l-2 border-transparent group-hover:border-brand-accent pl-4 transition-all duration-300">
                <span className="text-brand-accent font-mono text-xs mb-2">{project.year}</span>
                <h3 className="text-2xl font-display font-bold uppercase leading-none mb-1 text-white group-hover:text-brand-accent transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{project.subtitle}</p>
                <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase border border-white/20 px-2 py-0.5 text-gray-500">
                            {tag}
                        </span>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;