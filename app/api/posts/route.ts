import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { userId, ...postData } = data;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const patient = await prisma.patient.findUnique({
      where: { clerkId: userId },
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    const post = await prisma.post.create({
      data: {
        content: postData.content,
        imageUrl: postData.imageUrl,
        reportUrl: postData.reportUrl,
        patientId: patient.id,
        medicalHistory: postData.medicalHistory || "",
      },
    });

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        patient: {
          select: {
            fullName: true,
            email: true,
            age: true,
            gender: true,
            location: true,
            illness: true,
            symptoms: true,
          },
        },
        verifiedBy: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
