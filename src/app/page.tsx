'use client';
import { ChefHat, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col justify-center text-white">
      {/* Immersive Background Mapping */}
      <div className="absolute inset-0 -z-30 bg-[#060606]" />
      
      {/* Epic Global Background Fade */}
      <div 
        className="absolute inset-0 -z-20 opacity-40 mix-blend-overlay blur-[2px]"
        style={{
           backgroundImage: 'url(/images/Japanese.jpg)',
           backgroundSize: 'cover',
           backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/80 to-transparent" />

      {/* Decorative Orbs */}
      <div className="absolute top-0 right-[-10vw] w-[50vw] h-[50vw] bg-accent/20 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10vw] left-[-10vw] w-[40vw] h-[40vw] bg-pink-500/10 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 sm:px-12 z-10 w-full pt-10">
        <div className="flex flex-col items-start gap-8 max-w-3xl">
          
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
             <ChefHat className="w-5 h-5 text-accent" />
             <span className="text-sm font-semibold tracking-wider text-white/90 uppercase">Exclusive Beta</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05]">
            A Culinary <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-pink-500">
              Journey
            </span>
            <br /> Through Time.
          </h1>

          <p className="text-lg md:text-2xl text-foreground/80 font-medium leading-relaxed max-w-xl">
            Unlock a curated archives of the world's finest authentic recipes. 
            From the bustling markets of Delhi to the quiet sushi bars of Kyoto, your global adventure starts here.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 pt-8 w-full sm:w-auto">
            <Link 
              href="/signup" 
              className="group flex items-center justify-center gap-3 bg-gradient-to-r from-accent to-pink-600 hover:from-pink-600 hover:to-accent text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-accent/20 transition-all hover:scale-105"
            >
              Begin Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/login" 
              className="flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-bold text-lg backdrop-blur-md transition-all hover:scale-[1.02]"
            >
              Sign In
            </Link>
          </div>
          
        </div>
      </main>

      {/* Aesthetic Footer Fade */}
      <div className="absolute bottom-10 left-12 opacity-50 font-medium text-sm text-white/50 uppercase tracking-widest hidden lg:block">
        Global Cuisines &copy; {new Date().getFullYear()}
      </div>
    </div>
  );
}
