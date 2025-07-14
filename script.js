let lastKeyword = "";

async function getQuotes() {
  const keyword = document.getElementById("keyword").value.trim();
  if (!keyword) return alert("Please enter a keyword");
  lastKeyword = keyword;

  try {
    const res = await fetch(`https://cloudflare-worker-quote-api.rvw.workers.dev/?keyword=${encodeURIComponent(keyword)}`);
    const data = await res.json();
    displayQuotes(data.quotes.response);
  } catch (err) {
    alert("Error fetching quotes. Try again.");
    console.error(err);
  }
}

function regenerateQuotes() {
  if (!lastKeyword) return alert("Please generate at least once");
  getQuotes();
}

function displayQuotes(text) {
  const quotesContainer = document.getElementById("quotes");
  quotesContainer.innerHTML = "";

  const quotes = text.split("\n").filter(q => q.trim() !== "");

  quotes.forEach((quote, index) => {
    const div = document.createElement("div");
    div.className = "quote";
    div.innerText = quote;

    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.innerText = "📋 Copy";
    btn.onclick = () => {
      navigator.clipboard.writeText(quote);
      btn.innerText = "✅ Copied";
      setTimeout(() => btn.innerText = "📋 Copy", 1500);
    };

    div.appendChild(btn);
    quotesContainer.appendChild(div);
  });
}
