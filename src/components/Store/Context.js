import { createContext } from 'react';

const StoreContext = createContext({
  cliente: null,
  setCliente: () => {},
});

export default StoreContext;
