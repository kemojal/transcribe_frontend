export default (state, action) => {
  let themeData = state.BioTheme;
  switch (action.type) {
    case "SET_BIO_DATA":
      return {
        ...state,
        BioTheme: action.payload,
      };
    case "SET_SLUG":
      return {
        ...state,
        userSlug: action.payload,
      };
    case "SET_AUTH_TOKEN":
      return {
        ...state,
        authToken: action.payload,
      };
    case "SET_PROFILE":
      return {
        ...state,
        profileImg: action.payload,
      };
    case "SET_PAGE_BG_COLOR":
      themeData.pageBgColor = action.payload;
      return {
        ...state,
        BioTheme: themeData,
      };
    case "SET_LINKBUTTON_COLOR":
      themeData.linkButtonColor = action.payload;
      return {
        ...state,
        BioTheme: themeData,
      };
    case "SET_LINKBUTTON_TEXT_COLOR":
      themeData.linkButtonTextColor = action.payload;
      return {
        ...state,
        BioTheme: themeData,
      };
    case "SET_SOCIALICON_COLOR":
      themeData.socialIconColor = action.payload;
      return {
        ...state,
        BioTheme: themeData,
      };
    case "SET_BIO_TEXT_COLOR":
      themeData.bioTextColor = action.payload;
      return {
        ...state,
        BioTheme: themeData,
      };
    case "SET_MODAL_LINK_TYPE":
      return {
        ...state,
        isModalType: action.payload,
      };
    default:
      return state;
  }
};
