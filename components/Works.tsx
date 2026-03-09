"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MapPin,
  Calendar,
} from "lucide-react";

export interface Project {
  year: string;
  title: string;
  subtitle: string;
  client: string;
  venue: string;
  tags: string[];
  img: string;
  gallery?: string[];
}

const INITIAL_SHOW_COUNT = 6;

interface WorksProps {
  dbProjects?: Project[];
}

const Works: React.FC<WorksProps> = ({ dbProjects = [] }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [isModalAnimating, setIsModalAnimating] = useState(false);

  // Projects in REVERSE chronological order (newest first: 24 → 2)
  // Projects 1 and 25 excluded due to missing images
  const projectsData: Project[] = [
    {
      year: "2025/11",
      title: "Audi Progressive Experience",
      subtitle: "Club D Chungdam / Playa Lounge",
      client: "Audi Korea",
      venue: "Club D Chungdam / Playa Lounge",
      tags: ["CHAUFFEUR SERVICE", "VEHICLE MANAGEMENT"],
      img: "/images/portfolio/24-1.jpg.jpg",
      gallery: [
        "/images/portfolio/24-2.jpg.jpg",
        "/images/portfolio/24-3.jpg.jpg",
        "/images/portfolio/24-4.jpg.jpg",
      ],
    },
    {
      year: "2023/5",
      title: "BMW Excellence Lounge 2023",
      subtitle: "Lead Building",
      client: "BMW Korea",
      venue: "Lead Building",
      tags: ["EVENT", "PLANNING / OPERATION"],
      img: "/images/portfolio/23-1.jpg",
      gallery: ["/images/portfolio/23-2.png", "/images/portfolio/23-3.jpg"],
    },
    {
      year: "2023/5",
      title: "Break the Norm",
      subtitle: "Lead Building",
      client: "BMW Korea",
      venue: "Lead Building",
      tags: ["PARTY", "PLANNING / OPERATION"],
      img: "/images/portfolio/22-1.jpg",
      gallery: ["/images/portfolio/22-2.jpg", "/images/portfolio/22-3.jpg"],
    },
    {
      year: "2023/5",
      title: "BMW XM Launch",
      subtitle: "Lead Building",
      client: "BMW Korea",
      venue: "Lead Building",
      tags: ["EVENT", "PLANNING / OPERATION"],
      img: "/images/portfolio/21-1.jpg.avif",
    },
    {
      year: "2023/3",
      title: "SMS 2023",
      subtitle: "KINTEX",
      client: "BMW Korea",
      venue: "KINTEX",
      tags: ["EXHIBITION", "PLANNING / OPERATION"],
      img: "/images/portfolio/20-1.jpg.avif",
      gallery: ["/images/portfolio/20-2.png"],
    },
    {
      year: "2022/12",
      title: "The First-ever BMW XM",
      subtitle: "Vivaldi Part",
      client: "BMW Korea",
      venue: "Vivaldi Part",
      tags: ["EXHIBITION", "PLANNING / OPERATION"],
      img: "/images/portfolio/19-1.jpg",
      gallery: ["/images/portfolio/19-2.jpg", "/images/portfolio/19-3.jpg"],
    },
    {
      year: "2022/12",
      title: "BMW Year-end Concert",
      subtitle: "Chroma",
      client: "BMW Korea",
      venue: "Chroma",
      tags: ["CONCERT", "PLANNING / OPERATION"],
      img: "/images/portfolio/18-1.png.avif",
      gallery: [
        "/images/portfolio/18-2.jpg",
        "/images/portfolio/18-3.jpg",
        "/images/portfolio/18-4.jpg",
      ],
    },
    {
      year: "2022/12",
      title: "BMW THE 7 and i7 Launch",
      subtitle: "Chroma",
      client: "BMW Korea",
      venue: "Chroma",
      tags: ["EVENT", "PLANNING / OPERATION"],
      img: "/images/portfolio/17-1.png",
      gallery: ["/images/portfolio/17-2.png"],
    },
    {
      year: "2022/10",
      title: "BMW Ladies Championship",
      subtitle: "Oak Valley C.C",
      client: "BMW Korea",
      venue: "Oak Valley C.C",
      tags: ["SPORT", "PLANNING / OPERATION"],
      img: "/images/portfolio/16-1.png",
      gallery: [
        "/images/portfolio/16-2.jpg",
        "/images/portfolio/16-3.jpg",
        "/images/portfolio/16-4.jpg",
      ],
    },
    {
      year: "2022/9",
      title: "FRIEZE Seoul",
      subtitle: "COEX",
      client: "BMW Korea",
      venue: "COEX",
      tags: ["EXHIBITION", "PLANNING / OPERATION"],
      img: "/images/portfolio/15-1.png",
      gallery: [
        "/images/portfolio/15-2.jpg",
        "/images/portfolio/15-3.jpg",
        "/images/portfolio/15-4jpg.jpg",
      ],
    },
    {
      year: "2022/7",
      title: "BMW i The Ultimate Concert",
      subtitle: "BIFF Theatre",
      client: "BMW Korea",
      venue: "BIFF Theatre",
      tags: ["EVENT", "PLANNING / OPERATION"],
      img: "/images/portfolio/14-1.png",
      gallery: [
        "/images/portfolio/14-2.jpg",
        "/images/portfolio/14-3.jpg",
        "/images/portfolio/14-4.jpg",
      ],
    },
    {
      year: "2022/7",
      title: "BIMOS 2022",
      subtitle: "BEXCO",
      client: "BMW Korea",
      venue: "BEXCO",
      tags: ["EVENT", "PLANNING / OPERATION"],
      img: "/images/portfolio/13-1.png",
    },
    {
      year: "2022/5",
      title: "BMW M 50th",
      subtitle: "BMW Driving Center",
      client: "BMW Korea",
      venue: "BMW Driving Center",
      tags: ["EVENT", "PLANNING / OPERATION"],
      img: "/images/portfolio/12-1.png",
      gallery: ["/images/portfolio/12-2.png", "/images/portfolio/12-3.jpg"],
    },
    {
      year: "2022/5",
      title: "BMW Excellence Lounge 2022",
      subtitle: "DDP",
      client: "BMW Korea",
      venue: "DDP",
      tags: ["EVENT", "PLANNING / OPERATION"],
      img: "/images/portfolio/11-1.png",
      gallery: [
        "/images/portfolio/11-2.jpg",
        "/images/portfolio/11-3.jpg",
        "/images/portfolio/11-4.jpg",
      ],
    },
    {
      year: "2021/12",
      title: "BMW i Display",
      subtitle: "Vivaldi Part",
      client: "BMW Korea",
      venue: "Vivaldi Part",
      tags: ["EVENT", "PLANNING / OPERATION"],
      img: "/images/portfolio/10-1.jpg",
      gallery: [
        "/images/portfolio/10-2.jpg",
        "/images/portfolio/10-3.jpg",
        "/images/portfolio/10-4.jpg",
      ],
    },
    {
      year: "2021/12",
      title: "JOY IS ELECTRIC Concert",
      subtitle: "BMW Driving Center",
      client: "BMW Korea",
      venue: "BMW Driving Center",
      tags: ["CONCERT", "PLANNING / OPERATION"],
      img: "/images/portfolio/9-1.jpg",
      gallery: ["/images/portfolio/9-2.jpg", "/images/portfolio/9-3.jpg"],
    },
    {
      year: "2021/12",
      title: "BMW iX Launch",
      subtitle: "BMW Driving Center",
      client: "BMW Korea",
      venue: "BMW Driving Center",
      tags: ["EVENT", "PLANNING / OPERATION"],
      img: "/images/portfolio/8-1.png",
      gallery: ["/images/portfolio/8-2.jpg"],
    },
    {
      year: "2021/10",
      title: "BMW Ladies Championship",
      subtitle: "LPGA International Busan",
      client: "BMW Korea",
      venue: "LPGA International Busan",
      tags: ["SPORT", "PLANNING / OPERATION"],
      img: "/images/portfolio/7-1.jpg",
      gallery: ["/images/portfolio/7-2.jpg"],
    },
    {
      year: "2021/5",
      title: "BMW Kidney Road",
      subtitle: "COEX Square",
      client: "BMW Korea",
      venue: "COEX Square",
      tags: ["EVENT", "PLANNING / OPERATION"],
      img: "/images/portfolio/6-1.jpg",
      gallery: ["/images/portfolio/6-2.jpg", "/images/portfolio/6-3.jpg"],
    },
    {
      year: "2021/5",
      title: "BMW Excellence Lounge 2021",
      subtitle: "D-Museum / Signiel Busan",
      client: "BMW Korea",
      venue: "D-Museum / Signiel Busan",
      tags: ["EVENT", "PLANNING / OPERATION"],
      img: "/images/portfolio/5-1.png",
      gallery: [
        "/images/portfolio/5-2.jpg",
        "/images/portfolio/5-3.jpg",
        "/images/portfolio/5-4.jpg",
      ],
    },
    {
      year: "2019/3",
      title: "SMS 2019",
      subtitle: "KINTEX",
      client: "Nissan Korea",
      venue: "KINTEX",
      tags: ["EXHIBITION", "PLANNING / OPERATION"],
      img: "/images/portfolio/4.jpg",
    },
    {
      year: "2018/12",
      title: "Nissan X-Trail Concert",
      subtitle: "S-Factory",
      client: "Nissan Korea",
      venue: "S-Factory",
      tags: ["CONCERT", "PLANNING / OPERATION"],
      img: "/images/portfolio/3-1.JPG",
      gallery: ["/images/portfolio/3-2.jpg", "/images/portfolio/3-3.jpg"],
    },
    {
      year: "2018/7",
      title: "BIMOS 2018",
      subtitle: "BEXCO",
      client: "Nissan Korea",
      venue: "BEXCO",
      tags: ["EXHIBITION", "PLANNING / OPERATION"],
      img: "/images/portfolio/2.jpeg",
    },
  ];

  // Combine DB projects (newest) with the hardcoded projects
  const allProjects = [...dbProjects, ...projectsData];

  // Display projects based on showAll state
  const displayedProjects = showAll
    ? allProjects
    : allProjects.slice(0, INITIAL_SHOW_COUNT);
  const remainingCount = allProjects.length - INITIAL_SHOW_COUNT;

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setIsModalAnimating(true);
  };

  const closeModal = useCallback(() => {
    setIsModalAnimating(false);
    setTimeout(() => setSelectedProject(null), 200);
  }, []);

  const totalImages = selectedProject
    ? (selectedProject.gallery?.length || 0) + 1
    : 0;

  const nextImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (!selectedProject) return;
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    },
    [selectedProject, totalImages],
  );

  const prevImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (!selectedProject) return;
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    },
    [selectedProject, totalImages],
  );

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const getAllImages = (): string[] => {
    if (!selectedProject) return [];
    return [selectedProject.img, ...(selectedProject.gallery || [])];
  };

  const getCurrentImage = () => {
    const images = getAllImages();
    return images[currentImageIndex] || "";
  };

  // Keyboard navigation for modal
  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject, closeModal, nextImage, prevImage]);

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
          {displayedProjects.map((project, index) => (
            <div
              key={index}
              className="group cursor-pointer opacity-0 animate-fade-in-up"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "forwards",
              }}
              onClick={() => openModal(project)}
            >
              <div className="relative aspect-[16/10] overflow-hidden mb-6 border border-white/5">
                <div className="absolute inset-0 bg-brand-accent mix-blend-color opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-10"></div>
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  loading="lazy"
                />
                {project.gallery && project.gallery.length > 0 && (
                  <div className="absolute bottom-4 right-4 bg-black/80 px-2 py-1 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    + {project.gallery.length} MORE
                  </div>
                )}
              </div>

              <div className="flex flex-col border-l-2 border-transparent group-hover:border-brand-accent pl-4 transition-all duration-300">
                <span className="text-brand-accent font-mono text-xs mb-1">
                  {project.year}
                </span>
                <span className="text-gray-500 text-xs mb-2">
                  {project.client}
                </span>
                <h3 className="text-xl md:text-2xl font-heading font-semibold uppercase leading-tight mb-1 text-white group-hover:text-brand-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3">{project.subtitle}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase border border-white/20 px-2 py-0.5 text-gray-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {!showAll && remainingCount > 0 && (
          <div className="flex justify-center mt-16">
            <button
              onClick={() => setShowAll(true)}
              className="group flex flex-col items-center gap-2 text-gray-400 hover:text-brand-accent transition-colors"
            >
              <span className="text-sm uppercase tracking-widest">
                View More Projects
              </span>
              <span className="text-xs text-gray-600 group-hover:text-gray-400 transition-colors">
                +{remainingCount} more
              </span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        )}

        {/* Show Less Button */}
        {showAll && (
          <div className="flex justify-center mt-16">
            <button
              onClick={() => setShowAll(false)}
              className="text-gray-400 hover:text-brand-accent transition-colors text-sm uppercase tracking-widest"
            >
              Show Less
            </button>
          </div>
        )}
      </div>

      {/* Enhanced Modal */}
      {selectedProject && (
        <div
          className={`fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 transition-opacity duration-200 ${
            isModalAnimating ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all z-30"
            onClick={closeModal}
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <div
            className={`w-full max-w-6xl flex flex-col lg:flex-row gap-8 transition-all duration-300 ${
              isModalAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main Image Section */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="relative aspect-video bg-neutral-900/50 rounded-lg overflow-hidden border border-white/5">
                <Image
                  src={getCurrentImage()}
                  alt={selectedProject.title}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-contain"
                  priority
                />

                {/* Navigation Arrows */}
                {totalImages > 1 && (
                  <>
                    <button
                      onClick={(e) => prevImage(e)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/60 hover:bg-brand-accent text-white hover:text-black rounded-full transition-all opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={(e) => nextImage(e)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/60 hover:bg-brand-accent text-white hover:text-black rounded-full transition-all opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 px-4 py-1.5 rounded-full">
                      <span className="text-white/80 text-sm font-mono">
                        {currentImageIndex + 1} / {totalImages}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail Strip */}
              {totalImages > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                  {getAllImages().map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToImage(idx)}
                      className={`relative flex-shrink-0 w-20 h-14 rounded overflow-hidden border-2 transition-all ${
                        currentImageIndex === idx
                          ? "border-brand-accent"
                          : "border-transparent opacity-50 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Project Info Section */}
            <div className="lg:w-80 flex flex-col">
              {/* Project Meta */}
              <div className="space-y-6">
                <div>
                  <span className="text-brand-accent text-xs uppercase tracking-widest">
                    {selectedProject.year}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mt-2 leading-tight">
                    {selectedProject.title}
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-400">
                    <Calendar size={16} className="text-brand-accent" />
                    <span className="text-sm">{selectedProject.client}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <MapPin size={16} className="text-brand-accent" />
                    <span className="text-sm">{selectedProject.venue}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase bg-white/5 border border-white/10 px-3 py-1.5 text-gray-400 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Keyboard Hint */}
                <div className="hidden lg:block pt-6 border-t border-white/10">
                  <p className="text-xs text-gray-600">
                    Use{" "}
                    <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-gray-500">
                      ←
                    </kbd>{" "}
                    <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-gray-500">
                      →
                    </kbd>{" "}
                    to navigate,{" "}
                    <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-gray-500">
                      ESC
                    </kbd>{" "}
                    to close
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Works;
