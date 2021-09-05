import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContext, useAuth } from "./auth/useAuth";
import Content from "./components/app/Content";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import MainScreen from "./components/main/MainScreen";
import NotFound from "./components/shared/404";

const App: React.FC = () => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      <Router>
        <div className="flex flex-col w-screen h-screen items-center justify-center bg-white">
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
    </AuthContext.Provider>
  );
};

export default App;
