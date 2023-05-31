import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: "Please sign in" });
    }
    if (req.method === "DELETE") {
    //Delete a post
    const postId = req.body;
    
    try {
      console.log('trying');
      const result = await prisma.post.delete({
        where: {
          id: postId,
        },
      });
      console.log(result);
      res.status(200).json(result);
    } catch (err) {
      console.log('deletePost.tsx');
      res
        .status(403)
        .json({ message: "Error has occured whilst deleting the post" });
    }
  }
}
