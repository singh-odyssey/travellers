import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    let body: any = {};
    try {
      if (request && typeof request.json === "function") {
        body = await request.json();
      }
    } catch (e) {
      // ignore
    }

    const {
      name,
      languages,
      travelInterests,
      accommodationPrefs,
      budgetRange,
      socialLinks,
      bio,
      location,
      homeLocation,
      age,
      gender,
      travelStyle,
    } = body;

    const parsedAge = age !== undefined && age !== null ? parseInt(age.toString(), 10) : undefined;

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        onboarded: true,
        name: name ?? undefined,
        languages: languages ?? undefined,
        travelInterests: travelInterests ?? undefined,
        accommodationPrefs: accommodationPrefs ?? undefined,
        budgetRange: budgetRange ?? undefined,
        socialLinks: socialLinks ?? undefined,
        bio: bio ?? undefined,
        location: location ?? undefined,
        homeLocation: homeLocation ?? undefined,
        age: isNaN(parsedAge as any) ? undefined : parsedAge,
        gender: gender ?? undefined,
        travelStyle: travelStyle ?? undefined,
      },
    });

    return NextResponse.json({ success: true, message: "Onboarding completed" });
  } catch (error) {
    console.error("Error during onboarding:", error);
    return NextResponse.json(
      { error: "Failed to complete onboarding" },
      { status: 500 }
    );
  }
}
