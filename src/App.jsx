import "./App.css";
import Login from "./components/auth/login.component";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/shared/header.component";
import ProductList from "./components/products/ProductList.component";
import ProductDetail from "./components/products/ProductDetail.component";

function App() {
  const location = useLocation();

  const showHeader = location.pathname !== "/";

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </>
  );
}

const Dashboard = () => {
  return <h1 className="font-bold text-black">Welcome to the Dashboard</h1>;
};

export default App;
