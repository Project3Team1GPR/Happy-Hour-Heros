import { createContext, useContext, useState } from "react";
import { reducer } from './reducers'

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ ...props }) => {
  
  const [user, setUser] = useState({});

  return <Provider value={[user, setUser]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
