import { prisma } from "../../../lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";

export default async function patientPost(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // authenticated user's Clerk ID
    const { userId } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Find the patient 
    const patient = await prisma.patient.findUnique({
      where: { clerkId: userId },
    });

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }


    const { content, imageUrl, reportUrl } = req.body;


    if (!content.trim() || imageUrl.length === 0 || reportUrl.length === 0)
      {
        return res.status(400).json({ error: "All fields are required and must be valid" });
      }



    // Create new post in database
    const post = await prisma.post.create({
        data: {
          content,
          imageUrl: { set: imageUrl }, 
          reportUrl: { set: reportUrl }, 
          patientId: patient.id, 
        },
      });
      


    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
