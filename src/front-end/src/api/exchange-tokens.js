const exchangeTokens = (code) => {
  return fetch(`http://localhost:8080/exchange-token?code=${code}`)
    .then(response => response.json())
    .then(data => data)
    .catch(e => {})
};

export default exchangeTokens;
  