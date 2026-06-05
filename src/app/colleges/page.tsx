import Link from "next/link";

async function getColleges(search = "") {
  const res = await fetch(
    `http://localhost:3000/api/colleges?search=${search}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}


export default async function CollegesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const params = await searchParams;

  const colleges = await getColleges(
    params.search || ""
  );

  return (
    <div className="max-w-6xl mx-auto p-6">

      <form className="mb-6">
        <input
          name="search"
          defaultValue={params.search}
          placeholder="Search colleges..."
          className="border p-2 rounded w-full"
        />
      </form>
      <Link
        href="/compare"
        className="bg-black text-white px-4 py-2 rounded"
      >
        Compare Colleges
      </Link>
      <div className="grid gap-4">
        {colleges.map((college: any) => (
          <Link
            key={college.id}
            href={`/colleges/${college.id}`}
          >
            <div className="border p-4 rounded">
              <h2 className="font-bold">
                {college.name}
              </h2>

              <p>
                {college.city}, {college.state}
              </p>

              <p>₹{college.fees}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}