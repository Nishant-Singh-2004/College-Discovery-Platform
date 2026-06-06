"use client";

export default function SaveCollegeButton({
  collegeId,
}: {
  collegeId: string;
}) {
  async function saveCollege() {
    const res = await fetch("/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collegeId,
      }),
    });

    if (res.ok) {
      alert("College saved");
    } else {
      alert("Please login first");
    }
  }

  return (
    <button
      onClick={saveCollege}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Save College
    </button>
  );
}