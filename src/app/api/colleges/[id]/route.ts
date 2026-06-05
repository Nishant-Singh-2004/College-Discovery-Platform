import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const college = await prisma.college.findUnique({
    where: {
      id,
    },
    include: {
      courses: true,
      reviews: true,
    },
  });

  if (!college) {
    return Response.json(
      { error: "College not found" },
      { status: 404 }
    );
  }

  return Response.json(college);
}