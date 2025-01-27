export async function fetchProducts() {
  const baseUrl = "https://fakestoreapi.com/products";

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

export async function fetchCategories() {
  const baseUrl = "https://fakestoreapi.com/products/categories";

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
