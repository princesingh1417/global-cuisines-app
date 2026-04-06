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

interface CardProps {
  data: CuisineProps;
  onHover: (cuisine: string | null) => void;
}

export default function CuisineCard({ data, onHover }: CardProps) {
  const bgImage = `/images/${data.cuisine}.jpg`;

  return (
    <div 
      className="card-container perspective-1000 h-[32rem] w-full group cursor-pointer"
      onMouseEnter={() => onHover(data.cuisine)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="card-flip-inner transform-style-3d relative w-full h-full transition-transform duration-700 ease-out">
        
        {/* Front Panel */}
        <div 
          className="backface-hidden absolute inset-0 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 overflow-hidden bg-cover bg-center transform transition-transform duration-700 group-hover:scale-[1.02] border border-white/10 dark:border-white/5"
          style={{ backgroundImage: `url('${bgImage}')` }}
        >
          {/* Dark Overlay so text is highly readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-0" />
          
          <h2 className="text-5xl font-black tracking-tight text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] mb-2 z-10 text-center uppercase">
            {data.cuisine}
          </h2>
          
          <div className="absolute bottom-8 px-6 py-2.5 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white text-sm font-bold tracking-widest uppercase animate-pulse z-10 flex items-center shadow-lg">
            Hover for Menu
          </div>
        </div>

        {/* Back Panel */}
        <div className="backface-hidden rotate-y-180 absolute inset-0 glass-panel rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col bg-gradient-to-b from-black/80 to-black/95 border border-white/5">
          <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-5">
            <h3 className="text-3xl font-extrabold text-accent truncate pr-4">
              {data.cuisine}
            </h3>
            <span className="text-sm font-black bg-accent/20 text-accent px-4 py-1.5 rounded-full whitespace-nowrap shadow-sm">
              {data.dishes.length} Dishes
            </span>
          </div>
          
          <ul className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-accent/40 scrollbar-track-transparent">
            {data.dishes.map((dish) => (
              <li key={dish._id}>
                <Link
                  href={`/recipe/${dish.slug}`}
                  className="group/link block p-4 rounded-2xl transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl bg-white/5 hover:bg-gradient-to-r hover:from-accent hover:to-pink-600 focus:outline-none ring-1 ring-white/5 hover:ring-white/20"
                >
                  <span className="font-bold text-lg block text-white/95 group-hover/link:text-white transition-colors duration-300">
                    {dish.name}
                  </span>
                  <span className="text-sm text-white/60 group-hover/link:text-white/90 line-clamp-2 mt-1.5 transition-colors duration-300 leading-relaxed">
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
