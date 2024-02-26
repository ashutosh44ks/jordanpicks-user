import React from "react";

const PassContext = React.createContext({
  loggedUser: {
    _id: "",
    name: "",
    wallet: 0,
    defaultDiscount: 0,
    cart: [],
  },
  setLoggedUser: () => {},
  getProfileShort: () => {},
});

export default PassContext;
