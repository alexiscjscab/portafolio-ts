import { createContext } from 'react';

interface MyContextProps {
  language?: string;
  changeLanguage: (lng: string) => void;
  theme: 'dark' | 'light'; 
  toggleTheme: () => void; 
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

export default MyContext;
