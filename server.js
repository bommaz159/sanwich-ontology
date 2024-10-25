const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/query', async (req, res) => {
  const query = req.body.query;

  try {
    const response = await axios.post('http://localhost:7200/repositories/sandwich_repo', query, {
      headers: {
        'Content-Type': 'application/sparql-query'
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error querying GraphDB');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
