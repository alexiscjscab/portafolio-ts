import React from 'react';

interface MyContextProps {
  state: string;
  updateState: (newState: string) => void;
}

// Proporciona un valor por defecto para el contexto
const MyContext = React.createContext<MyContextProps | undefined>(undefined);

export default MyContext;
