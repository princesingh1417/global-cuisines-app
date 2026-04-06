import Link from 'next/link';

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

export default function CuisineCard({ data }: { data: CuisineProps }) {
  // We use our custom classes from globals.css for the 3D flip effect
  return (
    <div className="card-container perspective-1000 h-[28rem] w-full group cursor-pointer">
      <div className="card-flip-inner transform-style-3d relative w-full h-full transition-transform duration-700 ease-in-out">
        
        {/* Front Panel */}
        <div className="backface-hidden absolute inset-0 glass-panel rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 overflow-hidden">
          {/* Decorative background blob */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          
          <h2 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/60 drop-shadow-sm mb-4 z-10 text-center">
            {data.cuisine}
          </h2>
          
          <div className="absolute bottom-8 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 text-accent text-sm font-semibold tracking-wide animate-pulse">
            Hover to Reveal Menu
          </div>
        </div>

        {/* Back Panel */}
        <div className="backface-hidden rotate-y-180 absolute inset-0 glass-panel rounded-3xl shadow-xl p-6 md:p-8 flex flex-col bg-gradient-to-b from-transparent to-black/5 dark:to-white/5">
          <div className="flex items-center justify-between mb-6 border-b border-foreground/10 pb-4">
            <h3 className="text-2xl font-bold text-accent">
              {data.cuisine} Classics
            </h3>
            <span className="text-sm font-medium bg-accent/10 text-accent px-3 py-1 rounded-full">{data.dishes.length} Recipes</span>
          </div>
          
          <ul className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-accent/20 hover:scrollbar-thumb-accent/40 scrollbar-track-transparent">
            {data.dishes.map((dish) => (
              <li key={dish._id}>
                <Link
                  href={`/recipe/${dish.slug}`}
                  className="group/link block p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-lg bg-black/5 dark:bg-white/5 hover:bg-gradient-to-r hover:from-accent hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <span className="font-bold text-lg block group-hover/link:text-white transition-colors duration-300">
                    {dish.name}
                  </span>
                  <span className="text-sm text-foreground/70 group-hover/link:text-white/80 line-clamp-2 mt-1 transition-colors duration-300">
                    {dish.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
    </div>
  );
}
