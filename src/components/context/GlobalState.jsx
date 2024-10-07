import { createContext, useEffect, useReducer } from "react";

const initialState = {
  isAuthenticated: false,
  token: null,
  products: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LIST_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };
    default:
      return state;
  }
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        dispatch({ type: "LIST_PRODUCTS", payload: data });
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);

  const setProducts = (products) => {
    dispatch({ type: "LIST_PRODUCTS", payload: products });
  };

  const setUser = (userData) => {
    dispatch({ type: "SET_USER", payload: userData });
  };

  const login = (token) => {
    dispatch({ type: "LOGIN", payload: token });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <GlobalContext.Provider
      value={{ state, setUser, setProducts, login, logout }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
