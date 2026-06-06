export async function POST() {
  const response = Response.json({
    success: true,
  });

  response.headers.append(
    "Set-Cookie",
    "token=; Path=/; HttpOnly; Max-Age=0"
  );

  return response;
}