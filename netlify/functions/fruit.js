const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const name = event.path.split('/').pop();

    const response = await fetch(
      `https://www.fruityvice.com/api/fruit/${encodeURIComponent(name)}`
    );

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Fruit not found' })
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (error) {
    console.error('Errore nella function fruit:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Errore nel recupero dei dati' })
    };
  }
};
