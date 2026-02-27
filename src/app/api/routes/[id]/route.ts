/**
 * API Route: /api/routes/[id]
 * Get a specific route by ID
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const route = await prisma.route.findUnique({
      where: {
        id: params.id,
        userId: session.user.id, // Ensure user owns the route
      },
    });

    if (!route) {
      return NextResponse.json(
        { error: 'Route not found' },
        { status: 404 }
      );
    }

    // Parse waypoints if they exist
    const formattedRoute = {
      ...route,
      origin: {
        lat: route.originLat,
        lng: route.originLng,
      },
      destination: {
        lat: route.destinationLat,
        lng: route.destinationLng,
      },
      waypoints: route.waypoints ? JSON.parse(route.waypoints as string) : undefined,
    };

    return NextResponse.json(formattedRoute);
  } catch (error) {
    console.error('Error fetching route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch route' },
      { status: 500 }
    );
  }
}
