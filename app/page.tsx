import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const quickLinks = [
    {
      title: "ABOUT",
      description: "Who we are & Our Vision",
      href: "/about",
    },
    {
      title: "BUSINESS",
      description: "Experiential & Contents Creative",
      href: "/services",
    },
    {
      title: "PORTFOLIO",
      description: "Selected Works & Projects",
      href: "/portfolio",
    },
    {
      title: "CONTACT",
      description: "Let's Start Execution",
      href: "/contact",
    },
  ];

  return (
    <div className="bg-brand-black min-h-screen text-white font-sans selection:bg-brand-accent selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <Marquee />

        {/* Quick Navigation Section */}
        <section className="py-24 bg-brand-dark">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="group p-8 border border-white/10 hover:border-brand-accent/50 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/0 to-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-display font-bold text-white group-hover:text-brand-accent transition-colors mb-2">
                      {link.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
                      {link.description}
                    </p>
                    <ArrowRight
                      className="text-brand-accent opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300"
                      size={20}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
