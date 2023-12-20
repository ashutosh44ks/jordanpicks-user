import React from "react";

const PassContext = React.createContext({
  loggedUser: "",
  setLoggedUser: () => {},
});

export default PassContext;