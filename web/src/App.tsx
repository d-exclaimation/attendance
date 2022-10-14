import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
          <Routes>
            <Route path="/app" element={
              <Content/>
            }/>
            <Route path="/signup" element={
              <Signup />
            }/>
            <Route path="/login" element={
              <Login />
            }/>
            <Route path="/admin" element={
              <Panel />
            }/>
            <Route path="/" element={
              <MainScreen />
            }/>
            <Route path="*" element={
              <NotFound />
            } />
          </Routes>
        </AuthContext.Provider>
      </div>
    </Router>
  );
};

export default App;
