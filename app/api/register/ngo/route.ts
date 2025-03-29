import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const ngo = await prisma.NGO.create({
      data: {
        orgName: data.orgName,
        email: data.email,
        clerkId: data.clerkId,
        missionStatement: data.missionStatement,
        certifications: data.certifications,
        address: data.address,
        role: "ngo",
        digitalAvailablity: data.digitalAvailablity,
      },
    });

    return NextResponse.json({ ngo });
  } catch (error) {
    console.error("Error creating NGO:", error);
    return NextResponse.json({ error: "Failed to create NGO" }, { status: 500 });
  }
}
