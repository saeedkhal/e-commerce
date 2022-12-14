import React, { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/reducer";
import axios from "axios";
import {
  OPEN_SIDE_BAR,
  CLOSE_SIDE_BAR,
  UPDATE_PRODUCTS,
  UPDATE_ISLOADING,
  UPDATE_ERR,
  UPDATE_CHANNELS,
  UPDATE_CATEGORIES,
} from "../assets/contsntants/constants";

export const AppContext = createContext();
const initialState = {
  isSidebarOpen: true,
  products: [],
  featuredProduct: [],
  isLoading: true,
  filteredProducts: [],
  channels: [],
  categoryies: [],
};
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const OpenSidebar = () => {
    dispatch({ type: OPEN_SIDE_BAR });
  };
  const CloseSideBar = () => {
    dispatch({ type: CLOSE_SIDE_BAR });
  };
  const getProducts = async () => {
    try {
      dispatch({ type: UPDATE_ISLOADING, payload: true });
      const res = await axios.get("/Products");
      dispatch({ type: UPDATE_PRODUCTS, payload: res.data.records });
      dispatch({ type: UPDATE_ISLOADING, payload: false });
    } catch (err) {
      dispatch({ type: UPDATE_ERR, payload: true });
    }
  };
  const getChannels = async () => {
    try {
      dispatch({ type: UPDATE_ISLOADING, payload: true });
      const res = await axios.get("/Channels");
      dispatch({ type: UPDATE_CHANNELS, payload: res.data.records });
      dispatch({ type: UPDATE_ISLOADING, payload: false });
    } catch (err) {
      dispatch({ type: UPDATE_ERR, payload: true });
    }
  };
  const getcategoryies = async () => {
    try {
      dispatch({ type: UPDATE_ISLOADING, payload: true });
      const res = await axios.get("/Category");
      dispatch({ type: UPDATE_CATEGORIES, payload: res.data.records });
      dispatch({ type: UPDATE_ISLOADING, payload: false });
    } catch (err) {
      dispatch({ type: UPDATE_ERR, payload: true });
    }
  };
  useEffect(() => {
    getProducts();
    getChannels();
    getcategoryies();
  }, []);
  return (
    <AppContext.Provider
      value={{ ...state, OpenSidebar, CloseSideBar, getProducts, dispatch }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useContextProvider = () => {
  return useContext(AppContext);
};

export default AppProvider;
