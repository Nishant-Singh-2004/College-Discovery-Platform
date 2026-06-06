import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get("search") || "";
  const state = searchParams.get("state") || "";
  const course = searchParams.get("course") || "";
  const minRating = Number(
    searchParams.get("minRating") || "0"
  );

  const colleges = await prisma.college.findMany({
    where: {
      AND: [
        search
          ? {
              name: {
                contains: search,
                mode: "insensitive",
              },
            }
          : {},

        state
          ? {
              state,
            }
          : {},

        minRating > 0
          ? {
              rating: {
                gte: minRating,
              },
            }
          : {},

        course
          ? {
              courses: {
                some: {
                  name: {
                    contains: course,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },

    include: {
      courses: true,
    },

    take: 50,
  });

  return Response.json(colleges);
}