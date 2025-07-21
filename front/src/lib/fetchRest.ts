import { BACKEND_URL } from "@/lib/constants";
import { getSession } from "@/lib/session";

export const fetchRest = async (path: string, options?: RequestInit) => {
  const session = await getSession();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (session?.accessToken) {
    headers["Authorization"] = `Bearer ${session.accessToken}`;
  }

  const response = await fetch(`${BACKEND_URL}${path}`, {
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("REST API error:", errorData);
    throw new Error(errorData.message || "Failed to fetch data from REST API");
  }

  return response.json();
};
