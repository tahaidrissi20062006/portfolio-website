import { lazy, Suspense } from 'react';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

const FabricCanvas = lazy(() => import('./components/FabricCanvas'));

function FabricFallback() {
  return (
    <div
      className="fixed inset-0 z-0"
      style={{
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a0a2e 50%, #0a0e27 100%)',
      }}
    />
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen">
      {/* WebGL Background - only in hero area */}
      <Suspense fallback={<FabricFallback />}>
        <FabricCanvas />
      </Suspense>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
