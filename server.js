const express = require('express');
const cors = require('cors'); // Thêm dòng này
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Thêm dòng này để cho phép tất cả các nguồn truy cập
app.use(express.json());

app.post('/query', async (req, res) => {
  const { query } = req.body;

  try {
    const response = await fetch('http://localhost:7200/repositories/sandwich_repo', {
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
    res.status(500).send(`Error querying GraphDB: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
