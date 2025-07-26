export const fetchServices = async (
  query = "",
  cities = "",
  states = "",
  disabilities = ""
) => {
  const url = `https://stg-api.abilitynetwork.in/api/services/search?query=${query}&cities=${cities}&states=${states}&disabilities=${disabilities}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.services;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching services:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
    return [];
  }
};
