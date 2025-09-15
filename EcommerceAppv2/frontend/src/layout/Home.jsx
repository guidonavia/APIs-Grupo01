import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Navigator, Sidebar } from "./index";
import { useGlobalContext } from "../context/context";
import CheckoutPage from "../components/CheckoutPage";
import SellPage from "../components/SellPage";
import Login from "../components/Login";
import HomePage from "./HomePage"
import ProductPage from "./ProductPage"
import { useAuth } from "../context/AuthContext";

const PROTECTED_PATHS = ['/checkout', '/sell'];

function GateRoutes() {
  const { user } = useAuth();
  const isAuth = !!(user);
  const { pathname } = useLocation();
  const needsAuth = !isAuth && PROTECTED_PATHS.some(p => pathname.startsWith(p));

  if (needsAuth) return <Login />;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={isAuth ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/products/:id" element={<ProductPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/sell" element={<SellPage />} />
    </Routes>
  );
}

export default function Home() {
  const { state } = useGlobalContext();

  return (
    <Router>
      <div className="App">
        <Sidebar isShowing={state.showSidebar} />
        <GateRoutes />
      </div>
    </Router>
  );
}
