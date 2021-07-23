import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

import "./App.css";

const defaultHistory = createBrowserHistory();

function Header() {
  return (
    <div className="banner">
      <h1 className="banner-title">&#128571; Cats and Dogs &#128021;</h1>
      <h4>Random pics of cats and dogs</h4>
    </div>
  );
}

function Home({ history }) {
  const [input, setInput] = useState("");

  const handleOnClick = () => {
    history.push(`/cat/${input}`);
  };

  return (
    <div>
      <Header />
      <div className="home">
        <input
          placeholder="Insert a greeting"
          value={input}
          onBlur={(e) => setInput(e.target.value)}
        />
        <button onClick={handleOnClick}>Greet Me</button>
      </div>

      <div className="home">
        <div className="content">
          <div className="cat">
            <img width="400px" src="https://cataas.com/cat/says/hello" />
          </div>
          <div className="dog">
            <img
              width="400px"
              src="https://random.dog/91474781-c254-4397-b658-d19b7f0a4f5b.jpeg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function App({ history = defaultHistory }) {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route exact path="/" render={() => <Home history={history} />} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;