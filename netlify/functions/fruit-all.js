const fetch = require('node-fetch');

exports.handler = async () => {
  try {
    const response = await fetch('https://www.fruityvice.com/api/fruit/all');
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (error) {
    console.error("Errore nella function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Errore nel recupero dei dati' })
    };
  }
};
