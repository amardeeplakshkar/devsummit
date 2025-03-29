import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    const doctor = await prisma.doctor.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        clerkId: data.clerkId,
        licenseNumber: data.licenseNumber,
        specialization: data.specialization,
        experience: data.experience,
        role: "doctor"
      },
    });

    return NextResponse.json({ doctor });
  } catch (error) {
    console.error('Error creating doctor:', error);
    return NextResponse.json({ error: 'Failed to create doctor' }, { status: 500 });
  }
}