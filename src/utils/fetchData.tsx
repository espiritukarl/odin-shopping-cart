export async function fetchDataAPI(endpoint: string) {
  const baseUrl = `https://fakestoreapi.com/${endpoint}`;

  try {
    const response = await fetch(`${baseUrl}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
