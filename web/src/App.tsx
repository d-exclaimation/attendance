import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContext, useAuthProvider } from "./auth/useAuth";
import Panel from "./components/admin/Panel";
import Content from "./components/app/Content";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import MainScreen from "./components/main/MainScreen";
import NotFound from "./components/shared/404";

/**
 * Primary App starting point with logic
 * @returns The main application with routing and Context appkied.
 */
const App: React.FC = () => {
  const auth = useAuthProvider();

  return (
    <Router>
      <div className="flex flex-col w-screen h-screen items-center justify-center bg-white">
        <AuthContext.Provider value={auth}>
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
            <Route exact path="/admin">
              <Panel />
            </Route>
            <Route exact path="/">
              <MainScreen />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </AuthContext.Provider>
      </div>
    </Router>
  );
};

export default App;
