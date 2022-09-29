import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [article, setArticle] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios(
          "https://gateway.staging.dahai.art/api/article?articleId=14&identity"
        );
        console.log(res);
        setArticle(res);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
