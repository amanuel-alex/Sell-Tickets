import { cookies } from "next/headers";

export async function fetchWithAuth(url: string) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;
  
  const response = await fetch(fullUrl, {
    cache: "no-store",
    headers: {
      Cookie: sessionCookie ? `session=${sessionCookie.value}` : "",
    },
  });
  
  return response;
}

