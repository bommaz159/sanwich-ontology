// Không cần require 'node-fetch' nữa
// const fetch = require('node-fetch'); // Bỏ dòng này

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/query', async (req, res) => {
  const { query } = req.body;

  try {
    const response = await fetch('http://localhost:7200/repositories/sandwich-ontology', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/sparql-query',
        'Accept': 'application/sparql-results+json',
      },
      body: query
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error querying GraphDB:', error);
    res.status(500).send('Error querying GraphDB');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
