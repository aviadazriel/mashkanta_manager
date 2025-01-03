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
import Navbar from "./components/Navbar";
import { UserProvider } from "./UserContext";



const App = () => {
  return (
    <UserProvider>
    <Router>
    <Navbar />
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
    </UserProvider>
  );
};

export default App;
