import { useContext, useEffect } from "react";
import "./App.scss";
import "./index.css";
import { ThemeContext } from "./context/ThemeContext";
import { DARK_THEME } from "./constants/themeConstants";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import BaseLayout from "./layout/BaseLayout";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import {
  Dashboard,
  Menu,
  PageNotFound,
  Incidents,
  Statistiques,
  Demandes,
  LoginPage,
  ProtectedRoute,
  Users,

} from "./screens/index.js";
import { UserProfile } from "./components/index.js";

function App() {
  const { theme } = useContext(ThemeContext);
  const { user } = useSelector((store) => store.user);
  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  const isAdmin = user?.roles?.includes("ADMIN");

  return (
    <>
      <Router>
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <BaseLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/profile" element={<UserProfile />} />
            <Route index element={<Navigate to="/menu" />} />
            <Route
              path="/utilisateurs"
              element={isAdmin ? <Users /> : <Navigate to="/menu" />}
            />
            <Route path="/menu" element={<Menu />} />
            <Route path="/incidents" element={<Incidents />} />
            <Route path="/demandes" element={<Demandes />} />
            <Route
              path="/statistiques"
              element={isAdmin ? <Statistiques /> : <Navigate to="/menu" />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
