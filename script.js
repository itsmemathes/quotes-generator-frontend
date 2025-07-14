async function getQuotes() {
  const keyword = document.getElementById("keywordInput").value.trim();
  const container = document.getElementById("quotesContainer");
  container.innerHTML = "🔄 Generating quotes...";

  if (!keyword) {
    container.innerHTML = "❌ Please enter a keyword.";
    return;
  }

  try {
    const response = await fetch(`https://cloudflare-worker-quote-api.rvw.workers.dev/?keyword=${encodeURIComponent(keyword)}`);
    const data = await response.json();

    if (data?.quotes?.response) {
      const quotes = data.quotes.response
        .split("\n")
        .filter(q => q.trim() !== "")
        .map(q => `<div class="quote">${q.trim()}</div>`)
        .join("");

      container.innerHTML = quotes;
    } else {
      container.innerHTML = "❌ No quotes found.";
    }
  } catch (error) {
    console.error("Fetch error:", error);
    container.innerHTML = "⚠️ Error fetching quotes.";
  }
}
