import "./App.css";
import Login from "./components/auth/login.component";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/shared/header.component";
import ProductList from "./components/products/ProductList.component";
import ProductDetail from "./components/products/ProductDetail.component";
import PrivateRoute from "./components/auth/PrivateRoute";
import Dashboard from "./components/Dashboard.component";

function App() {
  const location = useLocation();

  const showHeader = location.pathname !== "/";

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="/product"
          element={<PrivateRoute element={<ProductList />} />}
        />
        <Route
          path="/products/:id"
          element={<PrivateRoute element={<ProductDetail />} />}
        />
      </Routes>
    </>
  );
}

export default App;
