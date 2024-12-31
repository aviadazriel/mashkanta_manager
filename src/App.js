import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import ArticlesPage from "./pages/ArticlesPage";
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";
import ChatPage from "./pages/ChatPage";


const App = () => {
  return (
    <Router>
      <Routes>
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
