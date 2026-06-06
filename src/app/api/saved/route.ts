import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);

    if (!payload) {
      return Response.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    const saved = await prisma.savedCollege.findMany({
      where: {
        userId: payload.userId,
      },
      include: {
        college: true,
      },
    });

    return Response.json(saved);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}