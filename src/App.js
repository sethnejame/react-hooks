import React, { useState, useEffect } from "react";
import axios from "axios";

const FetchNews = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
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
        console.log(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};

const App = () => {
  const [query, setQuery] = useState("redux");
  const [
    { data, isLoading, isError },
    setUrl
  ] = FetchNews("https://hn.algolia.com/api/v1/search?query=redux", {
    hits: []
  });

  return (
    <div className="container-fluid mt-4">
      <form
        onSubmit={e => {
          e.preventDefault();
          setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
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
