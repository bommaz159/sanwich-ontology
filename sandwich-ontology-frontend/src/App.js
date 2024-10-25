import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleQuery = async () => {
    try {
      const response = await fetch('https://sanwich-ontology-1.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error querying:', error);
    }
  };

  return (
    <div className="App">
      <h1>Sandwich Ontology Query</h1>
      <textarea
        rows="10"
        cols="50"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your SPARQL query here"
      />
      <br />
      <button onClick={handleQuery}>Run Query</button>
      {result && (
        <div>
          <h2>Query Result:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
