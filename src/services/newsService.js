const API_BASE_URL = "http://localhost:5000/api";

export const getNews = async ({
  country = "in",
  category = "general",
  page = 1,
  pageSize = 12,
  query = ""
}) => {

  const params = new URLSearchParams();

  params.append("page", page);
  params.append("pageSize", pageSize);

  if (query && query.trim() !== "") {

    params.append("query", query.trim());

  } else {

    params.append("country", country);
    params.append("category", category);
  }

  const response = await fetch(
    `${API_BASE_URL}/news?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(
      "Unable to connect to NewsMonkey AI backend."
    );
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(
      data.message || "Unable to fetch news."
    );
  }

  return data;
};