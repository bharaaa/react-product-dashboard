import { createContext, useReducer } from 'react';

// Define action types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// Create the initial state
const initialState = {
  isAuthenticated: !!localStorage.getItem('token'), 
  token: localStorage.getItem('token') || null,
  products: [],
};

// Create the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };
    default:
      return state;
  }
};

// Create the Global Context
export const GlobalContext = createContext();

// Create the provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Action creators
  const login = (token) => {
    localStorage.setItem('token', token);
    dispatch({ type: LOGIN, payload: token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT });
  };

  const setProducts = (products) => {
    dispatch({ type: SET_PRODUCTS, payload: products });
  };

  return (
    <GlobalContext.Provider value={{ state, login, logout, setProducts }}>
      {children}
    </GlobalContext.Provider>
  );
};
