import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function SavedPage() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("token")?.value;

  if (!token) {
    return (
      <div className="p-8">
        Please login first
      </div>
    );
  }

  const payload = verifyToken(token);

  if (!payload) {
    return (
      <div className="p-8">
        Invalid session
      </div>
    );
  }

  const saved =
    await prisma.savedCollege.findMany({
      where: {
        userId: payload.userId,
      },
      include: {
        college: true,
      },
    });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Saved Colleges
      </h1>

      {saved.length === 0 ? (
        <p>No saved colleges yet.</p>
      ) : (
        <div className="grid gap-4">
          {saved.map((item) => (
            <Link
              key={item.id}
              href={`/colleges/${item.college.id}`}
            >
              <div className="border p-4 rounded">
                <h2 className="font-bold">
                  {item.college.name}
                </h2>

                <p>
                  {item.college.city},{" "}
                  {item.college.state}
                </p>

                <p>
                  Rating:{" "}
                  {item.college.rating}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}