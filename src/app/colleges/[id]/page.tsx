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
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">
        {college.name}
      </h1>

      <p className="mb-2">
        {college.city}, {college.state}
      </p>

      <p className="mb-2">
        Rating: {college.rating}
      </p>

      <p className="mb-2">
        Fees: ₹{college.fees}
      </p>

      <p className="mb-2">
        Placement Rate: {college.placementRate}%
      </p>

      <p className="mb-2">
        Average Package: ₹{college.avgPackage} LPA
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Overview
        </h2>

        <p>{college.description}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Courses
        </h2>

        {college.courses.map((course: any) => (
          <div
            key={course.id}
            className="border p-3 rounded mb-2"
          >
            <p>{course.name}</p>
            <p>{course.duration}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Reviews
        </h2>

        {college.reviews.map((review: any) => (
          <div
            key={review.id}
            className="border p-3 rounded mb-2"
          >
            <p>⭐ {review.rating}</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}