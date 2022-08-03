import React from 'react';
import Context from './Context';
import useStorage from '../../utils/useStorage';

const StoreProvider = ({ children }) => {
  const [cliente, setCliente] = useStorage('cliente');

  return (
    <Context.Provider
      value={{
        cliente,
        setCliente,
      }}
    >
      {children}
    </Context.Provider>
  )
}


export default StoreProvider;