const response = await fetch(
  `https://api.twelvedata.com/price?symbol=${stocksSymbols.join(",")}&apikey=7815da7ac2ab43ca8f4a4b73e10eb5ca`
);
