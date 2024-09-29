import { useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import MyContext from './Context';

interface MyProviderProps {
  children: ReactNode;
}

type Theme = 'dark' | 'light';

const MyProvider = ({ children }: MyProviderProps) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [theme, setTheme] = useState<Theme>('dark');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <MyContext.Provider value={{ changeLanguage, language, theme, toggleTheme }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
