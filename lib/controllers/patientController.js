import { prisma } from "../../../lib/prisma";

export default async function postPatientPost(req, res) {
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
      


    res.status(201).json({ message: "Post created successfully", data:post });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


export default async function getPatientPostList(req, res) {

    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  
    try {
      // Fetch all posts along with patient details and verification status
      const posts = await prisma.post.findMany({
        include: {
          patient: {
            select: {
              fullName: true,
              email: true,
              age: true,
              gender: true,
              medicalHistory: true,
              illness: true,
              symptoms: true,
              location: true,
            },
          },
        },
        select: {
          content: true,
          imageUrl: true,
          reportUrl: true,
          verifiedBy: true,
          verified: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      
  
      res.status(200).json({
        message: "Posts fetched successfully",
        data: posts,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
}
  






