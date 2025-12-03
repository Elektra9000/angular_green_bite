const functions = require('firebase-functions');
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// route relative: NON includere il prefisso /api qui
app.get('/fruit/all', async (req, res) => {
  try {
    const response = await fetch('https://www.fruityvice.com/api/fruit/all');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error fetching /fruit/all:', err);
    res.status(500).json({ error: 'Proxy error' });
  }
});

app.get('/fruit/:name', async (req, res) => {
  try {
    const name = encodeURIComponent(req.params.name);
    const response = await fetch(`https://www.fruityvice.com/api/fruit/${name}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(`Error fetching /fruit/${req.params.name}:`, err);
    res.status(500).json({ error: 'Proxy error' });
  }
});

exports.api = functions.https.onRequest(app);
