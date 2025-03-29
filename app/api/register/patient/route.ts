import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    const patient = await prisma.patient.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        clerkId: data.clerkId,
        phoneNumber: data.phoneNumber || "",
        age: data.age,
        gender: data.gender,
        location: data.location,
        illness: [],
        symptoms: [],
        role: "patient"
      },
    });

    return NextResponse.json({ patient });
  } catch (error) {
    console.error('Error creating patient:', error);
    return NextResponse.json({ error: 'Failed to create patient' }, { status: 500 });
  }
}