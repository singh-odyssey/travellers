/**
 * API Route: /api/routes
 * Handles route CRUD operations
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const RouteSchema = z.object({
  id: z.string().optional(),
  origin: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  destination: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  waypoints: z.array(z.object({
    location: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
    stopover: z.boolean(),
    name: z.string().optional(),
  })).optional(),
  originName: z.string().optional(),
  destinationName: z.string().optional(),
  distance: z.number(),
  duration: z.number(),
  encodedPolyline: z.string(),
  tripName: z.string().optional(),
  notes: z.string().optional(),
});

/**
 * GET /api/routes - Get all routes for authenticated user
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const routes = await prisma.route.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(routes);
  } catch (error) {
    console.error('Error fetching routes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch routes' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/routes - Create or update a route
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = RouteSchema.parse(body);

    // If ID provided, update existing route
    if (validatedData.id) {
      const route = await prisma.route.update({
        where: {
          id: validatedData.id,
          userId: session.user.id, // Ensure user owns the route
        },
        data: {
          originLat: validatedData.origin.lat,
          originLng: validatedData.origin.lng,
          destinationLat: validatedData.destination.lat,
          destinationLng: validatedData.destination.lng,
          originName: validatedData.originName,
          destinationName: validatedData.destinationName,
          distance: validatedData.distance,
          duration: validatedData.duration,
          encodedPolyline: validatedData.encodedPolyline,
          tripName: validatedData.tripName,
          notes: validatedData.notes,
          waypoints: validatedData.waypoints ? JSON.stringify(validatedData.waypoints) : null,
        },
      });

      return NextResponse.json(route);
    }

    // Create new route
    const route = await prisma.route.create({
      data: {
        userId: session.user.id,
        originLat: validatedData.origin.lat,
        originLng: validatedData.origin.lng,
        destinationLat: validatedData.destination.lat,
        destinationLng: validatedData.destination.lng,
        originName: validatedData.originName,
        destinationName: validatedData.destinationName,
        distance: validatedData.distance,
        duration: validatedData.duration,
        encodedPolyline: validatedData.encodedPolyline,
        tripName: validatedData.tripName,
        notes: validatedData.notes,
        waypoints: validatedData.waypoints ? JSON.stringify(validatedData.waypoints) : null,
      },
    });

    return NextResponse.json(route, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid route data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error saving route:', error);
    return NextResponse.json(
      { error: 'Failed to save route' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/routes - Delete a route
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const routeId = searchParams.get('id');

    if (!routeId) {
      return NextResponse.json(
        { error: 'Route ID required' },
        { status: 400 }
      );
    }

    await prisma.route.delete({
      where: {
        id: routeId,
        userId: session.user.id, // Ensure user owns the route
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting route:', error);
    return NextResponse.json(
      { error: 'Failed to delete route' },
      { status: 500 }
    );
  }
}
