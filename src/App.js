import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import ArticlesPage from "./pages/ArticlesPage";
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";
import ChatPage from "./pages/ChatPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";



const App = () => {
  return (
    
    <Router>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Link to="/login" style={{ margin: "0 10px" }}>Login</Link>
        <Link to="/register" style={{ margin: "0 10px" }}>Register</Link>
        <Link to="/dashboard" style={{ margin: "0 10px" }}>Dashboard</Link>
      </div>
      <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/chat" element={<ChatPage />} />


      </Routes>
    </Router>
  );
};

export default App;
