export const compareContents = async (firstContent, secondContent) => {
    if (!firstContent || !secondContent) {
      return { output: "Contents cannot be empty." };
    }
  
    try {
      const response = await fetch("http://localhost:8080/diffFormatter/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstContent, secondContent }),
      });
  
      if (response.ok) {
        return await response.json();
      } else {
        const error = await response.text();
        return { output: `Error occurred while fetching response: ${error}` };
      }
    } catch (error) {
      return { output: `Fetch error: ${error.message}` };
    }
  };