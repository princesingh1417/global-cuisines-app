// src/app/recipe/[slug]/layout.tsx
import { Metadata } from 'next';
import dbConnect from '@/lib/mongodb';
import Dish from '@/models/Dish';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const slug = (await params).slug;
    await dbConnect();
    const dish = await Dish.findOne({ slug });

    if (!dish) {
      return {
        title: 'Recipe Not Found',
        description: 'The requested recipe could not be found.',
      };
    }

    return {
      title: `${dish.name} | ${dish.cuisine} Recipe`,
      description: `Learn how to make authentic ${dish.name}. ${dish.description}`,
    };
  } catch (error) {
    return {
      title: 'Recipe',
      description: 'View full recipe details.',
    };
  }
}

export default function RecipeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
