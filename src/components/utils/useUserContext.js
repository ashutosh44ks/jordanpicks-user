import { useContext } from "react";
import PassContext from "./PassContext";

export function useUserContext() {
  return useContext(PassContext);
}
