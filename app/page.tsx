import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import About from '../components/About';
import Services from '../components/Services';
import Works from '../components/Works';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <div className="bg-brand-black min-h-screen text-white font-sans selection:bg-brand-accent selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Works />
        <Contact />
      </main>
    </div>
  );
}
