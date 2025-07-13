import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [keyword, setKeyword] = useState('');
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateQuotes = async () => {
    if (!keyword.trim()) return alert("Please enter a keyword");

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/generate', {
        keyword: keyword,
      });
      setQuotes(response.data.quotes);
    } catch (error) {
      alert("Error generating quotes. Check backend or console.");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>InstaQuotes Generator</h1>
      <input
        type="text"
        placeholder="Enter a keyword (e.g., love)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <br />
      <button onClick={generateQuotes}>
        {loading ? 'Generating...' : 'Generate Quotes'}
      </button>

      <ul>
        {quotes.map((q, index) => (
          <li key={index}>{q}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
