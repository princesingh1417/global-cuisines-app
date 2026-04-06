'use client';

import { useEffect, useState } from 'react';
import CuisineCard from '@/components/CuisineCard';
import { ChefHat } from 'lucide-react';

interface Dish {
  _id: string;
  name: string;
  slug: string;
  description: string;
}

interface CuisineProps {
  cuisine: string;
  dishes: Dish[];
}

export default function Home() {
  const [cuisines, setCuisines] = useState<CuisineProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hoveredCuisine, setHoveredCuisine] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/cuisines');
        if (res.ok) {
          const data = await res.json();
          setCuisines(data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Failed to fetch cuisines', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <main className="min-h-screen py-16 px-4 sm:px-8 max-w-[100rem] mx-auto relative pt-24 overflow-x-hidden">
      
      {/* Global Background Map for Hover Effects */}
      <div className="fixed inset-0 -z-30 bg-background transition-colors duration-1000" />
      
      {/* Pre-load and mount all backgrounds so crossfading is instant */}
      {['Indian', 'Italian', 'Continental', 'Mexican', 'Chinese', 'Japanese'].map((cuisineName) => (
        <div
          key={cuisineName}
          className={`fixed inset-0 -z-20 bg-cover bg-center transition-all duration-[800ms] ease-out will-change-transform ${
            hoveredCuisine === cuisineName 
              ? 'opacity-30 dark:opacity-[0.15] scale-105 blur-[8px]' 
              : 'opacity-0 scale-100 blur-[24px]'
          }`}
          style={{ backgroundImage: `url('/images/${cuisineName}.jpg')` }}
        />
      ))}

      {/* Ambient background glows for premium feel */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-accent/20 rounded-full blur-[160px] -z-10 pointer-events-none mix-blend-screen" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-pink-500/10 rounded-full blur-[160px] -z-10 pointer-events-none mix-blend-screen" />

      <header className="text-center mb-16 md:mb-24 space-y-6 relative z-10">
        <div className="inline-flex items-center justify-center p-5 bg-gradient-to-br from-accent/40 to-accent/10 backdrop-blur-md rounded-3xl shadow-xl border border-accent/20 mb-4 transform hover:scale-110 transition-transform duration-500">
          <ChefHat className="w-14 h-14 text-foreground drop-shadow-xl" />
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight drop-shadow-2xl">
          Savor the <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-pink-500">World</span>
        </h1>
        <p className="text-2xl text-foreground/90 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md">
          Embark on a culinary journey through our curated collection of authentic recipes from five distinct global cuisines.
        </p>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 xl:gap-14 mx-auto">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-[32rem] rounded-3xl bg-foreground/10 animate-pulse border border-foreground/20 backdrop-blur-sm" />
          ))}
        </div>
      ) : error ? (
        <div className="max-w-3xl mx-auto text-center glass-panel p-12 rounded-3xl border border-red-500/20 bg-red-500/5 shadow-2xl">
          <h2 className="text-3xl font-extrabold text-red-500 mb-4">Database Connection Error</h2>
          <p className="text-foreground/80 mb-6 text-lg leading-relaxed">
            We couldn't connect to the MongoDB database. 
            This usually means your Vercel deployment is missing the <code>MONGODB_URI</code> environment variable, or your MongoDB cluster has not whitelisted Vercel's IP address (0.0.0.0/0).
          </p>
        </div>
      ) : cuisines.length === 0 ? (
        <div className="max-w-3xl mx-auto text-center glass-panel p-12 rounded-3xl border border-pink-500/20 bg-pink-500/5 shadow-2xl">
          <h2 className="text-4xl font-extrabold text-accent mb-4">Database is Empty!</h2>
          <p className="text-foreground/80 mb-6 text-xl leading-relaxed">
            The database successfully connected, but there are no recipes inside of it! 
            You must run your seed script to populate the database with the global cuisines.
          </p>
        </div>
      ) : (
        /* Reduced column count to exactly 2 on large screens to force the cards to stretch much wider */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-12 lg:gap-16 mx-auto w-full max-w-7xl px-4 md:px-8">
          {cuisines.map((item) => (
            <CuisineCard 
               key={item.cuisine} 
               data={item} 
               onHover={setHoveredCuisine} 
            />
          ))}
        </div>
      )}
    </main>
  );
}
