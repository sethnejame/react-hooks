import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState({
    hits: []
  });

  const [query, setQuery] = useState("redux");
  const [url, setUrl] = useState(
    "https://hn.algolia.com/api/v1/search?query=redux"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const result = await axios(url);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
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
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() =>
          setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`)
        }
      >
        Submit
      </button>
      {isError && <div>Something went wrong. . .</div>}

      {isLoading ? (
        <div>Loading. . .</div>
      ) : (
        <ul className="mt-4">
          {data.hits.map((item, index) => (
            <li key={index}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
