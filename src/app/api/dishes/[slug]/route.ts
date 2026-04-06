import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Dish from '@/models/Dish';

export const revalidate = 3600;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const slug = (await params).slug;
    await dbConnect();
    const dish = await Dish.findOne({ slug });
    
    if (!dish) {
      return NextResponse.json({ error: 'Dish not found' }, { status: 404 });
    }

    return NextResponse.json(dish);
  } catch (error) {
    console.error(`Error fetching dish data:`, error);
    return NextResponse.json({ error: 'Failed to fetch dish details' }, { status: 500 });
  }
}
