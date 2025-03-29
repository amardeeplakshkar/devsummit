import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const clerkId = searchParams.get("clerkId");

    if (!clerkId) return NextResponse.json({ error: "Missing clerkId" }, { status: 400 });

    const [patient, doctor, ngo] = await Promise.all([
      prisma.patient.findUnique({ where: { clerkId }, select: { role: true } }),
      prisma.doctor.findUnique({ where: { clerkId }, select: { role: true } }),
      prisma.NGO.findUnique({ where: { clerkId }, select: { role: true } }) 
    ]);

    const role = patient?.role || doctor?.role || ngo?.role || null;

    if (!role) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({ role });
  } catch (error) {
    console.error("Error fetching user role:", error);
    return NextResponse.json({ error: "Failed to fetch user role" }, { status: 500 });
  }
}
