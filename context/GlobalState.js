import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// Initial state
const initialState = {
  currentLanguage: "en",
  BioTheme: {},
  userSlug: "",
  profileImg: "",
  authToken: "",
  isModalType: false,
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions

  function setBio(data) {
    // console.log("setting data = ", data)
    dispatch({
      type: "SET_BIO_DATA",
      payload: data,
    });
  }
  function setSlug(data) {
    dispatch({
      type: "SET_SLUG",
      payload: data,
    });
  }
  function setProfile(data) {
    dispatch({
      type: "SET_PROFILE",
      payload: data,
    });
  }
  function setProp(PropName, data) {
    // console.table({
    //   "PropName": PropName,
    //   "Data": data
    // })
    dispatch({
      type: PropName,
      payload: data,
    });
  }

  function setCurrentLanguage(lang) {
    dispatch({
      type: "SET_LANGUAGE",
      payload: lang,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        BioTheme: state.BioTheme,
        userSlug: state.userSlug,
        profileImg: state.profileImg,
        isModalType: state.isModalType,
        authToken: state.authToken.setBio,
        setSlug,
        setProfile,
        setProp,
        setBio,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
