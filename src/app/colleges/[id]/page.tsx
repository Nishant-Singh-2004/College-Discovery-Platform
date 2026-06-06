import SaveCollegeButton from "@/components/SaveCollegeButton";
async function getCollege(id: string) {
  const res = await fetch(
    `http://localhost:3000/api/colleges/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch college");
  }

  return res.json();
}

export default async function CollegePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const college = await getCollege(id);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">

        <div className="flex justify-between items-start mb-4">

          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              {college.name}
            </h1>

            <p className="text-slate-500 mt-2">
              📍 {college.city}, {college.state}
            </p>
          </div>

          <SaveCollegeButton collegeId={college.id} />
        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-6">

          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-sm text-slate-500">
              Rating
            </p>
            <p className="text-xl font-bold">
              ⭐ {college.rating}
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-sm text-slate-500">
              Fees
            </p>
            <p className="text-xl font-bold">
              ₹{college.fees.toLocaleString()}
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-sm text-slate-500">
              Placement
            </p>
            <p className="text-xl font-bold">
              {college.placementRate}%
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-sm text-slate-500">
              Avg Package
            </p>
            <p className="text-xl font-bold">
              ₹{college.avgPackage} LPA
            </p>
          </div>

        </div>

      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">
          Overview
        </h2>

        <p>{college.description}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">
          Courses
        </h2>

        {college.courses.map((course: any) => (
          <div
            key={course.id}
            className="bg-slate-50 rounded-lg p-4 mb-3"
          >
            <p>{course.name}</p>
            <p>{course.duration}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">
          Reviews
        </h2>

        {college.reviews.map((review: any) => (
          <div
            key={review.id}
            className="bg-slate-50 rounded-lg p-4 mb-3"
          >
            <p>⭐ {review.rating}</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}