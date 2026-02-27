// ===============================
// Crypto Module - Global Trade Capital
// ===============================

const cryptoSymbols = [
  "BTC/USD","ETH/USD","BNB/USD","XRP/USD","ADA/USD","SOL/USD","DOGE/USD"
];

async function fetchCrypto() {
  try {
    const response = await fetch(
      `https://api.twelvedata.com/price?symbol=${cryptoSymbols.join(",")}&apikey=7815da7ac2ab43ca8f4a4b73e10eb5ca`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching crypto:", error);
    return {};
  }
}

async function updateCryptoTicker() {
  const prices = await fetchCrypto();
  const tickersDiv = document.getElementById("tickers");
  
  // Add crypto prices to ticker bar
  cryptoSymbols.forEach(symbol => {
    if (prices[symbol] && prices[symbol].price) {
      const div = document.createElement("div");
      div.textContent = `${symbol}: $${parseFloat(prices[symbol].price).toFixed(2)}`;
      tickersDiv.appendChild(div);
    }
  });
}

// Run immediately
updateCryptoTicker();

// Refresh every 15 seconds
setInterval(updateCryptoTicker, 15000);
