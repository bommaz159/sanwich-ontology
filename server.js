const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/query', async (req, res) => {
  const { query } = req.body;

  try {
    const response = await fetch('http://LAPTOP-E3NJJ9JU:7200/repositories/sandwich_repo', {
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
