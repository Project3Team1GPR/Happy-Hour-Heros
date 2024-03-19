import { createContext, useContext, useState } from "react";
import { reducer } from './reducers'

const StoreContext = createContext();
const { Provider } = StoreContext;

const GlobalStateProvider = ({ ...props }) => {
  
  const [user, setUser] = useState({});

  return <Provider value={[user, setUser]} {...props} />;
};

const useGlobalContext = () => {
  return useContext(StoreContext);
};

export { GlobalStateProvider, useGlobalContext };
