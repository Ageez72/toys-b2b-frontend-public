"use client";
import React, { createContext, useContext, useReducer, useEffect } from "react";
let initialLang;

function setLang() {
  let lang;
  // // if (typeof window !== 'undefined') {
  //   if (localStorage?.getItem("lang")) {
  //     lang = localStorage?.getItem("lang")
  //   } else {
  //     lang = "en"
  //   }
  // // } else {
  // //   lang = "en"
  // // }

//   initialLang = lang
}
// setLang()

const initialState = {
    BASEURL: "https://pick.alekha.com:8443/pick/faces/redirect/b2b?",
    LANG: initialLang || "ar",
    STOREDITEMS: [],
    DIRECTION: initialLang === "en" ? "ltr" : "rtl",
};
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  // Update localStorage when language state changes
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //   localStorage.setItem("lang", state.LANG);
  //   }
  // }, [state.LANG]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "LANG":
      return { ...state, LANG: action.payload };
    case "STORED-ITEMS":
      return { ...state, STOREDITEMS: action.payload };
    default:
      return state;
  }
};
export default AppProvider;
