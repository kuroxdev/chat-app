import { useState, useEffect } from "react";
import Login from "./components/Login";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Register from "./components/Register";
import Chat from "./components/Chat";
import "./App.css";
import logo from "./assets/logo.png";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/chat");
    }
  }, [token, navigate]);

  return (
    <div className="container">
      <nav>
        <img src={logo} alt="Logo" className="logo" />
        <div className="nav-links">
          {token ? (
            <>
              <Link to="/chat">Chat</Link>
            </>
          ) : (
            <>
              <Link to="/">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to="/chat" /> : <Login setToken={setToken} />
          }
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/chat" /> : <Register />}
        />
        <Route
          path="/chat"
          element={token ? <Chat setToken={setToken} /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
