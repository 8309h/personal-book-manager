const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiFetch = async (endpoint, options = {}) => {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
            credentials: "include",
            headers: {
                  "Content-Type": "application/json",
                  ...options.headers
            },
            ...options
      });

      return response.json();
};