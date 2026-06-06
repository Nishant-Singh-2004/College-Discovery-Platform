import Link from "next/link";

async function getColleges(
  search = "",
  state = "",
  course = "",
  minRating = ""
) {
  const res = await fetch(
  `${process.env.NEXT_PUBLIC_APP_URL}/api/colleges?search=${search}&state=${state}&course=${course}&minRating=${minRating}`,
  {
    cache: "no-store",
  }
);

  return res.json();
}


export default async function CollegesPage({
  searchParams,
}: {
  searchParams: Promise<{
  search?: string;
  state?: string;
  course?: string;
  minRating?: string;
}>;
}) {
  const params = await searchParams;

  const colleges = await getColleges(
  params.search || "",
  params.state || "",
  params.course || "",
  params.minRating || ""
);

  return (
    <main className="bg-slate-300">
  <div className="max-w-7xl bg-slate-300 mx-auto px-6 py-8">

    <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">

      <form className="grid md:grid-cols-4 gap-4 mb-8">

  <input
    name="search"
    defaultValue={params.search}
    placeholder="Search colleges..."
    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white"
  />

  <select
    name="state"
    defaultValue={params.state}
    className="px-4 py-3 rounded-xl border border-slate-300 bg-white"
  >
    <option value="">
      All States
    </option>

    <option value="Delhi">
      Delhi
    </option>

    <option value="Maharashtra">
      Maharashtra
    </option>

    <option value="Karnataka">
      Karnataka
    </option>

    <option value="Tamil Nadu">
      Tamil Nadu
    </option>

    <option value="Punjab">
      Punjab
    </option>

    <option value="Uttar Pradesh">
      Uttar Pradesh
    </option>
  </select>

  <select
    name="course"
    defaultValue={params.course}
    className="px-4 py-3 rounded-xl border border-slate-300 bg-white"
  >
    <option value="">
      All Courses
    </option>

    <option value="B.Tech">
      B.Tech
    </option>

    <option value="MCA">
      MCA
    </option>

    <option value="MBA">
      MBA
    </option>
  </select>

  <select
    name="minRating"
    defaultValue={params.minRating}
    className="px-4 py-3 rounded-xl border border-slate-300 bg-white"
  >
    <option value="">
      Any Rating
    </option>

    <option value="2">
      2★ and above
    </option>

    <option value="3">
      3★ and above
    </option>

    <option value="4">
      4★ and above
    </option>
  </select>

  <button
    className="bg-blue-600 text-white px-4 py-3 rounded-xl"
  >
    Apply Filters
  </button>

</form>

      <Link
        href="/compare"
        className="bg-blue-600 text-white center px-6 py-3 rounded-xl hover:bg-blue-700"
      >
        Compare Colleges
      </Link>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {colleges.map((college: any) => (
        <Link
          key={college.id}
          href={`/colleges/${college.id}`}
        >
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">

            <h2 className="font-bold text-lg text-black mb-3">
              {college.name}
            </h2>

            <p className="text-slate-500 mb-4">
              📍 {college.city}, {college.state}
            </p>

            <div className="space-y-2 text-sm text-black">

              <p>
                ⭐ Rating: {college.rating}
              </p>

              <p>
                💰 Fees: ₹{college.fees.toLocaleString()}
              </p>

              <p>
                📈 Placement: {college.placementRate}%
              </p>

            </div>

          </div>
        </Link>
      ))}

    </div>

  </div>
  </main>
);
}