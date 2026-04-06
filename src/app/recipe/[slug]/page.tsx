'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ChevronLeft, Clock, Utensils, Flame, ChefHat } from 'lucide-react';
import Link from 'next/link';

interface Dish {
  _id: string;
  name: string;
  slug: string;
  cuisine: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}

export default function RecipePage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [dish, setDish] = useState<Dish | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    
    async function loadDish() {
      try {
        const res = await fetch(`/api/dishes/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setDish(data);
        } else {
          setError('Recipe not found');
        }
      } catch (err) {
        setError('Failed to load recipe details');
      } finally {
        setLoading(false);
      }
    }
    loadDish();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-background">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-accent"></div>
      </div>
    );
  }

  if (error || !dish) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 space-y-6 bg-background">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-pink-500">{error || 'Recipe Not Found'}</h2>
        <Link href="/" className="px-6 py-3 rounded-xl bg-foreground/10 hover:bg-foreground/20 font-medium transition-all shadow-md hover:shadow-lg">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-16 px-4 md:px-8 max-w-5xl mx-auto pt-24 relative">
      <div className="fixed top-20 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="fixed bottom-20 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-[140px] -z-10 pointer-events-none" />

      <Link href="/" className="inline-flex items-center text-accent hover:text-pink-500 transition-colors font-semibold mb-10 group bg-accent/5 px-4 py-2 rounded-full border border-accent/20 hover:border-pink-500/50">
        <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
        Back to Menus
      </Link>

      <article className="glass-panel p-8 md:p-14 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Decor */}
        <div className="absolute -top-10 -right-10 text-accent/5 rotate-12">
          <Utensils className="w-80 h-80 drop-shadow-xl" />
        </div>

        <header className="mb-14 relative z-10 border-b border-foreground/10 pb-10">
          <div className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-accent to-pink-600 text-white text-sm font-bold tracking-widest uppercase mb-8 shadow-md">
            {dish.cuisine}
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60 leading-tight">
            {dish.name}
          </h1>
          <p className="text-2xl text-foreground/70 leading-relaxed max-w-3xl font-medium">
            {dish.description}
          </p>
          
          <div className="flex flex-wrap gap-4 mt-10">
             <div className="flex items-center text-foreground/80 font-semibold bg-black/5 dark:bg-white/5 py-3 px-6 rounded-2xl border border-foreground/5 shadow-sm">
               <Clock className="w-5 h-5 mr-3 text-accent" /> Prep & Serve
             </div>
             <div className="flex items-center text-foreground/80 font-semibold bg-black/5 dark:bg-white/5 py-3 px-6 rounded-2xl border border-foreground/5 shadow-sm">
               <Flame className="w-5 h-5 mr-3 text-accent" /> Premium Recipe
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 relative z-10">
          <section className="md:col-span-4">
            <div className="bg-black/5 dark:bg-white/5 p-8 rounded-3xl border border-foreground/5 shadow-inner h-full">
              <h2 className="text-3xl font-extrabold flex items-center mb-8 text-foreground/90">
                <Utensils className="w-7 h-7 mr-3 text-accent" />
                Ingredients
              </h2>
              <ul className="space-y-5">
                {dish.ingredients.map((item, idx) => (
                  <li key={idx} className="flex items-start text-foreground/80 group">
                    <span className="w-2 h-2 rounded-full bg-accent mt-2.5 mr-4 flex-shrink-0 group-hover:scale-150 transition-transform" />
                    <span className="leading-relaxed font-semibold text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="md:col-span-8">
            <h2 className="text-3xl font-extrabold flex items-center mb-8 text-foreground/90">
              <ChefHat className="w-8 h-8 mr-4 text-accent" />
              Method
            </h2>
            <ol className="space-y-10">
              {dish.instructions.map((step, idx) => (
                <li key={idx} className="flex flex-col space-y-3 group hover:bg-black/5 dark:hover:bg-white/5 p-6 rounded-2xl transition-colors border border-transparent hover:border-foreground/5">
                  <span className="text-sm font-black text-accent tracking-widest uppercase mb-1 flex items-center">
                    <span className="w-8 h-px bg-accent mr-3" /> Step {idx + 1}
                  </span>
                  <p className="text-xl text-foreground/80 leading-relaxed font-medium pl-4 border-l-4 border-foreground/10 group-hover:border-accent transition-colors">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </article>
    </main>
  );
}
