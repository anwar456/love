import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AppLayout from "./app/Layout/AppLayout";
import DashboardRouting from "./app/pages/Dashboard/DashboardRouting";
import LoginPage from "./app/pages/Login/LoginPage";
import RegisterPage from "./app/pages/Login/RegisterPage";
import NewsComponent from "./app/pages/Article/ArticlePage";
import WeatherPage from "./app/pages/Weather/WeatherPage";
import UserPage from "./app/pages/User/UserPage";
import AnalyticPage from "./app/pages/Analytic/AnalyticPage";
import TextAnalysisPage from "./app/pages/Text/TextAnalysisPage";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLogin(false);
    navigate('/login');
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isLogin ? <Navigate to="/dashboard" replace /> : <LoginPage setIsLogin={setIsLogin} />
        }
      />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="article" element={<NewsComponent />} />
      <Route path="weather" element={<WeatherPage />} />
      <Route path="user" element={<UserPage />} />
      <Route path="analytic" element={<AnalyticPage />} />
      <Route path="text-analysis" element={<TextAnalysisPage />} />
      <Route
        path="/"
        element={isLogin ? <AppLayout /> : <Navigate to="/login" replace />}
      >
        <Route path="dashboard" element={<DashboardRouting onLogout={handleLogout} />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
