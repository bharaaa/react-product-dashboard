import "./App.css";
import HeaderComponent from "./components/shared/header.component";
import LoginComponent from "./components/auth/login.component";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginComponent />} />
      </Routes>
    </Router>
  );
}

const Dashboard = () => {
  return <h1 className="font-bold text-black">Welcome to the Dashboard</h1>;
};

export default App;
