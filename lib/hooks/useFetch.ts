interface FetchData {
  url: string;
  method?: string;
  body?: any;
}

export const useFetch = () => {
  const fetchData = async ({
    url,
    method = "GET",
    body,
  }: FetchData): Promise<any> => {
    try {
      const response = await fetch(`http://localhost:8000/api/${url}`, {
        cache: "no-store",
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch vehicle details");
      }

      return response.json();
    } catch (error: any) {
      console.error("fetch error", error);
      return error;
    }
  };

  return { fetchData };
};
