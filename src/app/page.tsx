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

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/cuisines');
        if (res.ok) {
          const data = await res.json();
          setCuisines(data);
        }
      } catch (err) {
        console.error('Failed to fetch cuisines', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <main className="min-h-screen py-16 px-4 sm:px-8 max-w-7xl mx-auto relative pt-24 overflow-x-hidden">
      {/* Ambient background glows for premium feel */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-accent/10 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-pink-500/10 rounded-full blur-[140px] -z-10 pointer-events-none" />

      <header className="text-center mb-16 md:mb-24 space-y-6">
        <div className="inline-flex items-center justify-center p-5 bg-gradient-to-br from-accent/20 to-accent/5 rounded-3xl shadow-lg border border-accent/20 mb-4 transform hover:scale-105 transition-transform duration-300">
          <ChefHat className="w-12 h-12 text-accent drop-shadow-md" />
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Savor the <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-pink-500">World</span>
        </h1>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto font-medium leading-relaxed">
          Embark on a culinary journey through our curated collection of authentic recipes from five distinct global cuisines.
        </p>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-[28rem] rounded-3xl bg-foreground/5 animate-pulse border border-foreground/10" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
          {cuisines.map((item) => (
            <CuisineCard key={item.cuisine} data={item} />
          ))}
        </div>
      )}
    </main>
  );
}
