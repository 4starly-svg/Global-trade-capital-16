// ===============================
// FX Module - Global Trade Capital
// ===============================

const fxSymbols = [
  "EUR/USD","GBP/USD","USD/JPY","USD/CHF","AUD/USD","USD/CAD","NZD/USD"
];

async function fetchFX() {
  try {
    const response = await fetch(
      `https://api.twelvedata.com/price?symbol=${fxSymbols.join(",")}&apikey=7815da7ac2ab43ca8f4a4b73e10eb5ca`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching FX:", error);
    return {};
  }
}

async function updateFXTicker() {
  const prices = await fetchFX();
  const tickersDiv = document.getElementById("tickers");
  
  // Add FX prices to ticker bar
  fxSymbols.forEach(symbol => {
    if (prices[symbol] && prices[symbol].price) {
      const div = document.createElement("div");
      div.textContent = `${symbol}: ${parseFloat(prices[symbol].price).toFixed(4)}`;
      tickersDiv.appendChild(div);
    }
  });
}

// Run immediately
updateFXTicker();

// Refresh every 15 seconds
setInterval(updateFXTicker, 15000);
