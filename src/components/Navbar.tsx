import Link from "next/link";
import { cookies } from "next/headers";

export default async function Navbar() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  const isLoggedIn = !!token;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link
          href="/"
          className="text-2xl font-bold text-blue-600"
        >
          CollegeHub
        </Link>

        <div className="flex items-center gap-6 text-slate-700 font-medium">

          <Link
            href="/colleges"
            className="hover:text-blue-600"
          >
            Colleges
          </Link>

          <Link
            href="/compare"
            className="hover:text-blue-600"
          >
            Compare
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                href="/saved"
                className="hover:text-blue-600"
              >
                Saved
              </Link>

              <button
                onClick={() => {
                  fetch("/api/auth/logout", {
                    method: "POST",
                  }).then(() => {
                    window.location.href = "/";
                  });
                }}
                className="text-red-600 hover:text-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}