import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import MainScreen from "./components/main/MainScreen";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-row w-screen h-screen items-center justify-center bg-white">
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="*">
            <MainScreen />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
