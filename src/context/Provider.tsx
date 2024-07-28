import { useState, ReactNode } from 'react';
import MyContext from './Context';
import { useTranslation } from 'react-i18next';

interface MyProviderProps {
  children: ReactNode;
}

const MyProvider = ({ children }: MyProviderProps) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  return (
    <MyContext.Provider value={{ changeLanguage, language }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
