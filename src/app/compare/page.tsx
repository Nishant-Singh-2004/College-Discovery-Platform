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
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">
        Compare Colleges
      </h1>

      <form className="grid md:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((num) => (
          <select
            key={num}
            name={`c${num}`}
            defaultValue={
              params[`c${num}` as keyof typeof params]
            }
            className="border p-2 rounded"
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
          className="bg-black text-white p-2 rounded"
        >
          Compare
        </button>
      </form>

      {colleges.length > 0 && (
        <div className="overflow-auto">
          <table className="w-full border">
            <tbody>
              <tr>
                <td className="border p-2 font-bold">
                  Name
                </td>

                {colleges.map((college) => (
                  <td
                    key={college.id}
                    className="border p-2"
                  >
                    {college.name}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="border p-2 font-bold">
                  Location
                </td>

                {colleges.map((college) => (
                  <td
                    key={college.id}
                    className="border p-2"
                  >
                    {college.city}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="border p-2 font-bold">
                  Fees
                </td>

                {colleges.map((college) => (
                  <td
                    key={college.id}
                    className="border p-2"
                  >
                    ₹{college.fees}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="border p-2 font-bold">
                  Rating
                </td>

                {colleges.map((college) => (
                  <td
                    key={college.id}
                    className="border p-2"
                  >
                    {college.rating}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="border p-2 font-bold">
                  Placement %
                </td>

                {colleges.map((college) => (
                  <td
                    key={college.id}
                    className="border p-2"
                  >
                    {college.placementRate}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="border p-2 font-bold">
                  Avg Package
                </td>

                {colleges.map((college) => (
                  <td
                    key={college.id}
                    className="border p-2"
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