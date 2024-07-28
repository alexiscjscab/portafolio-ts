import { createContext } from 'react';

interface MyContextProps {
  language?: string;
  changeLanguage: (lng: string) => void;
}
// Proporciona un valor por defecto para el contexto
const MyContext = createContext<MyContextProps | undefined>(undefined);

export default MyContext;
