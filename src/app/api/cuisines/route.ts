import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Dish from '@/models/Dish';

// Opt into static rendering and validate every hour
export const revalidate = 3600;

export async function GET() {
  try {
    await dbConnect();
    
    const cuisinesData = await Dish.aggregate([
      {
        $group: {
          _id: '$cuisine',
          dishes: {
            $push: {
              _id: '$_id',
              name: '$name',
              slug: '$slug',
              description: '$description'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          cuisine: '$_id',
          dishes: 1
        }
      },
      {
        $sort: { cuisine: 1 }
      }
    ]);

    return NextResponse.json(cuisinesData);
  } catch (error) {
    console.error('Error fetching cuisines data:', error);
    return NextResponse.json({ error: 'Failed to fetch cuisines' }, { status: 500 });
  }
}
