import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";
import Error from "../pages/Error/Error";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";


const App = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/login" 
          element={token ? <Navigate to="/profile" /> : <Login />} 
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
