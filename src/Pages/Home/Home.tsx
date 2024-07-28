import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { FaGlobe } from "react-icons/fa"; // Importar el icono de globo
import Contact from "../Contact/Contact";
import MyContext from "../../context/Context"; // Asegúrate de ajustar la ruta según sea necesario
import About from "../About/About";
import { useTranslation } from "react-i18next";

interface HomeProps {
  title?: string;
}

const HomeContainer = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background: rgba(0,0,0,0.8);
  
  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;
const Navbar = styled.nav`
  display: flex;
  align-items: center;
  background: rgba(0,0,0,0.2); // Fondo transparente
  top: 0;
  padding: 0.5rem;
  z-index: 1000; // Asegura que el navbar esté por encima del contenido
`;

const NavItems = styled.div`
  display: flex;
  flex: 1; // Esto permite que NavItems ocupe todo el espacio disponible
`;

const NavItem = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.875rem; // Tamaño de fuente más pequeño
  cursor: pointer;
  color: ${({ active }) => (active ? "#007bff" : "#fafafa")};
  border-bottom: ${({ active }) => (active ? "3px solid #007bff" : "none")};
  transition: color 0.3s, border-bottom 0.3s;
  outline: none;
  font-family: pirate;
  text-transform: uppercase;
  letter-spacing: 2px;

  &:hover {
    color: #007bff;
  }
`;

const LanguageSwitcher = styled.button`
  background: none;
  border: none;
  color: #fafafa;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s;
  outline: none;
  margin-right: 1rem; // Ajusta este margen según sea necesario

  &:hover {
    color: #007bff;
  }
`;

// Estilo para el contenido principal que se muestra debajo del navbar
const Content = styled.div`
  margin-top: 60px;
`;

type PagesProps = "About" | "Contact";

const Home: React.FC<HomeProps> = () => {
  const [pages, setPages] = useState<PagesProps>("About");
  const { language, changeLanguage } = useContext(MyContext) || {}
  const { t } = useTranslation();

  useEffect(() => {
    document.title = "Alexis Beas";
  }, []);

  return (
    <HomeContainer>
      <Navbar>
        <NavItems>
          <NavItem active={pages === "About"} onClick={() => setPages("About")}>
            {t('about')}
          </NavItem>
          <NavItem
            active={pages === "Contact"}
            onClick={() => setPages("Contact")}
          >
            {t('contact')}
          </NavItem>
        </NavItems>  
        <LanguageSwitcher onClick={() => changeLanguage && changeLanguage(language === "en" ? "es" : "en")}>
          { language }   <FaGlobe />
        </LanguageSwitcher>
      </Navbar>
      <Content>
        {pages === "About" && <About />}
        {pages === "Contact" && <Contact />}
      </Content>
    </HomeContainer>
  );
};

export default Home;
