async function getColleges() {
  const res = await fetch(
    "http://localhost:3000/api/colleges",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function Home() {
  const colleges = await getColleges();

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">
        College Discovery Platform
      </h1>

      <div className="grid gap-4">
        {colleges.map((college: any) => (
          <div
            key={college.id}
            className="border rounded-lg p-4"
          >
            <h2 className="text-xl font-semibold">
              {college.name}
            </h2>

            <p>
              {college.city}, {college.state}
            </p>

            <p>Fees: ₹{college.fees}</p>

            <p>Rating: {college.rating}</p>
          </div>
        ))}
      </div>
    </main>
  );
}