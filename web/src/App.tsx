//
//  App.tsx
//  web
//
//  Created by d-exclaimation on 21:28.
//

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";

const App: React.FC = () => {
  return (
    <main>
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="*">404</Route>
        </Switch>
      </Router>
    </main>
  );
};

export default App;
