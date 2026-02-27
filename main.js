// ===============================
// Main JS - Global Trade Capital
// ===============================

// Initialize portfolio
let portfolio = {
  "AAPL": 0,
  "TSLA": 0,
  "BTC": 0,
  "ETH": 0
};

// Update portfolio table
function updatePortfolioTable() {
  const tbody = document.querySelector("#portfolio-table tbody");
  tbody.innerHTML = ""; // clear existing rows

  Object.keys(portfolio).forEach(asset => {
    const tr = document.createElement("tr");
    const quantity = portfolio[asset];
    const price = getPrice(asset); // Get live price from 12Data
    const total = (quantity * price).toFixed(2);

    tr.innerHTML = `
      <td>${asset}</td>
      <td>${quantity}</td>
      <td>$${price}</td>
      <td>$${total}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Fake function to get price (will be updated dynamically)
function getPrice(asset) {
  const tickerDivs = document.querySelectorAll("#tickers div");
  for (let div of tickerDivs) {
    if (div.textContent.startsWith(asset)) {
      return parseFloat(div.textContent.split(": $")[1] || 0);
    }
  }
  return 0;
}

// Handle Buy/Sell buttons (placeholder functionality)
document.querySelectorAll(".trade-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const asset = prompt("Which asset?");
    const quantity = parseFloat(prompt("How many?"));
    if (portfolio.hasOwnProperty(asset) && !isNaN(quantity)) {
      if (btn.textContent === "Buy") {
        portfolio[asset] += quantity;
      } else {
        portfolio[asset] -= quantity;
        if (portfolio[asset] < 0) portfolio[asset] = 0;
      }
      updatePortfolioTable();
    }
  });
});

// Language toggle
document.getElementById("language-toggle").addEventListener("click", () => {
  const html = document.documentElement;
  if (html.lang === "en") {
    html.lang = "ar";
    document.getElementById("language-toggle").textContent = "EN";
  } else {
    html.lang = "en";
    document.getElementById("language-toggle").textContent = "عربي";
  }
});

// Initial table update
updatePortfolioTable();

// Refresh portfolio every 5 seconds (to catch live prices)
setInterval(updatePortfolioTable, 5000);
