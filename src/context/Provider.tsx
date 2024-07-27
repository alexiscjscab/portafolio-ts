import { useState, ReactNode } from 'react';
import MyContext from './Context';

interface MyProviderProps {
  children: ReactNode;
}

const MyProvider = ({ children }: MyProviderProps) => {
  const [state, setState] = useState('Valor inicial');

  const updateState = (newState: string) => {
    setState(newState);
  };

  return (
    <MyContext.Provider value={{ state, updateState }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
