import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const colleges = await prisma.college.findMany({
    take: 6,
  });

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-6xl font-bold text-slate-900 mb-6">
          Find Your Ideal College
        </h1>

        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          Search colleges, compare placements and fees,
          and save your favorite institutions.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/colleges"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
          >
            Explore Colleges
          </Link>

          <Link
            href="/compare"
            className="border border-black text-black bg-white hover:bg-slate-100 px-6 py-3 rounded-xl transition"
          >
            Compare Colleges
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Featured Colleges
          </h2>

          <Link
            href="/colleges"
            className="text-blue-600 hover:text-blue-700"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((college) => (
            <Link
              key={college.id}
              href={`/colleges/${college.id}`}
            >
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">

                <h3 className="font-bold text-lg text-slate-900 mb-2">
                  {college.name}
                </h3>

                <p className="text-slate-500 mb-4">
                  📍 {college.city}, {college.state}
                </p>

                <div className="space-y-2 text-sm text-slate-700">
                  <p>⭐ Rating: {college.rating}</p>

                  <p>
                    💰 Fees: ₹
                    {college.fees.toLocaleString()}
                  </p>

                  <p>
                    📈 Placement: {college.placementRate}%
                  </p>
                </div>

                <div className="mt-5 text-blue-600 font-medium">
                  View Details →
                </div>

              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}