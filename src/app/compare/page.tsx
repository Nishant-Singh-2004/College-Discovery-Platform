import { prisma } from "@/lib/prisma";

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{
    c1?: string;
    c2?: string;
    c3?: string;
  }>;
}) {
  const params = await searchParams;

  const ids = [params.c1, params.c2, params.c3].filter(
    Boolean
  ) as string[];

  const colleges = await prisma.college.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  const allColleges = await prisma.college.findMany({
    select: {
      id: true,
      name: true,
    },
    take: 100,
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-8 text-slate-900">
        Compare Colleges
      </h1>

      <form className="grid md:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3].map((num) => (
          <select
            key={num}
            name={`c${num}`}
            defaultValue={
              params[`c${num}` as keyof typeof params]
            }
            className="bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900"

          >
            <option value="">
              Select College
            </option>

            {allColleges.map((college) => (
              <option
                key={college.id}
                value={college.id}
              >
                {college.name}
              </option>
            ))}
          </select>
        ))}

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-3"
        >
          Compare
        </button>
      </form>

      {colleges.length > 0 && (
        <div className="overflow-auto">
          <table className="w-full bg-white rounded-xl overflow-hidden shadow-sm">
            <tbody>
              <tr>
                <td className="bg-slate-100 font-semibold p-4 text-slate-900">
                  Name
                </td>

                {colleges.map((college) => (
                  <td
                    key={college.id}
                    className="border border-slate-200 p-4 text-slate-700"
                  >
                    {college.name}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="bg-slate-100 font-semibold p-3">
                  Location
                </td>

                {colleges.map((college) => (
                  <td
                    key={college.id}
                    className="border border-slate-200 p-3"
                  >
                    {college.city}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="bg-slate-100 font-semibold p-3">
                  Fees
                </td>

                {colleges.map((college) => (
                  <td
                    key={college.id}
                    className="border border-slate-200 p-3"
                  >
                    ₹{college.fees}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="bg-slate-100 font-semibold p-3">
                  Rating
                </td>

                {colleges.map((college) => (
                  <td
                    key={college.id}
                    className="border border-slate-200 p-3"
                  >
                    {college.rating}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="bg-slate-100 font-semibold p-3">
                  Placement %
                </td>

                {colleges.map((college) => (
                  <td
                    key={college.id}
                    className="border border-slate-200 p-3"
                  >
                    {college.placementRate}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="bg-slate-100 font-semibold p-3">
                  Avg Package
                </td>

                {colleges.map((college) => (
                  <td
                    key={college.id}
                    className="border border-slate-200 p-3"
                  >
                    ₹{college.avgPackage} LPA
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}