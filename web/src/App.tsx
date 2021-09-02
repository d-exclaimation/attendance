import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Content from "./components/app/Content";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import MainScreen from "./components/main/MainScreen";
import NotFound from "./components/shared/404";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-row w-screen h-screen items-center justify-center bg-white">
        <Switch>
          <Route exact path="/app">
            <Content />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <MainScreen />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
