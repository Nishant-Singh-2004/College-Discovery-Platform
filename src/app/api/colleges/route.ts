import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get("search") || "";
  const state = searchParams.get("state") || "";

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
      ],
    },
    take: 20,
  });

  return Response.json(colleges);
}