import React, { useState, } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import MicroFrontend from "./MicroFrontend";

import "./App.css";

createBrowserHistory();

const {
  REACT_APP_DOGS_HOST: dogsHost,
  REACT_APP_CATS_HOST: catsHost,
} = process.env;

function Header() {
  return (
    <div className="banner">
      <h1 className="banner-title">&#128571; Cats and Dogs &#128021;</h1>
      <h4>Random pics of cats and dogs</h4>
    </div>
  );
}

function Dogs({ history, fnc }) {
  return <MicroFrontend history={history} host={dogsHost} name="Dogs" fnc={fnc} />;
}

function Cats({ history, fnc }) {
  return <MicroFrontend history={history} host={catsHost} name="Cats" fnc={fnc} />;
}

function GreetingCat({ history }) {
  return (
    <div>
      <Header />
      <div className="home">
        <MicroFrontend history={history} host={catsHost} name="Cats" />
      </div>
    </div>
  );
}

function Home({ history }) {
  const [input, setInput] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  setTimeout(() => {
    setIsVisible(true);
  }, 3000);

  const handleOnClick = () => {
    history.push(`/cat/${input}`);
  };
  
  return (
    <div>
      <Header />
      <div className="home">
        <input
          placeholder="Insert a greeting!"
          defaultValue={input}
          onBlur={(e) => setInput(e.target.value)}
        />
        <button onClick={handleOnClick}>Greet Me</button>
      </div>

      <div className="home">
        <div className="content">
          <div className="cat" style={{minWidth: "100px", minHeight: "100px"}}>
            {isVisible ? <Cats fnc={window.renderCats} /> : "loading..."}
          </div>
          <div className="dog" style={{minWidth: "100px", minHeight: "100px"}}>
            {isVisible ? <Dogs fnc={window.renderDogs} /> : "loading..."}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cat/:greeting" component={GreetingCat} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;