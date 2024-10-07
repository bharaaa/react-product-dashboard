import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <div className="flex flex-row justify-between py-5 items-center">
        <div>
          <p className="font-sans font-bold text-3xl">Home</p>
        </div>
        <div>
          <ul className="flex flex-row font-sans items-center">
            <li className="mx-2 font-normal hover:font-bold transition-all duration-200">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="mx-2 font-normal hover:font-bold transition-all duration-200">
              <Link to="/product">Products</Link>
            </li>
            <li className="mx-2">
              <button className="bg-blue-500 px-2 py-2 rounded-lg text-white font-sans font-bold hover:bg-blue-600 transition-colors duration-200" onClick={handleLogout}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="mb-5">
        <div className="bg-red-600 h-2">
          <h1 className="font-sans font-bold"></h1>
        </div>
      </div>
    </>
  );
};

export default Header;
