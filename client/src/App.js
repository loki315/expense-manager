import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

// components
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/home/Home";
import Error from "./components/Error";
import Navbar from "./components/Navbar";

// context
import { AuthContext } from "./context/AuthContext";

function App() {
  const { isLoggedIn, isAuthReady, error, setError } = useContext(AuthContext);

  return (
    <div className="App">
      {isAuthReady && (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
            <Route
              path="/login"
              element={!isLoggedIn ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!isLoggedIn ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
          {error.err && <Error error={error} setError={setError} />}
        </div>
      )}
    </div>
  );
}

export default App;
