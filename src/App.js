import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState({
    hits: []
  });

  const [query, setQuery] = useState("redux");
  const [url, setUrl] = useState('https://hn.algolia.com/api/v1/search?query=redux');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(url);
      console.log(result.data);
      setData(result.data);
    };

    fetchData();
  }, [url]);

  return (
    <div className="container-fluid mt-4">
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-primary mt-4"
          onClick={() => setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`)}
        >
          Submit
        </button>
      </div>
      <ul>
        {data.hits.map((item, index) => (
          <li key={index}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
