import "./App.css";
import Login from "./components/auth/login.component";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/shared/header.component";

function App() {
  const location = useLocation();

  const showHeader = location.pathname !== "/";

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

const Dashboard = () => {
  return <h1 className="font-bold text-black">Welcome to the Dashboard</h1>;
};

export default App;
