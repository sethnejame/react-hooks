import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState({
    hits: []
  });
  
  return (
    <div className="App">
      <h1>Hello World!</h1>
    </div>
  );
};

export default App;
