import React, { useEffect, useState, useContext } from "react";
import styled, { ThemeProvider, keyframes } from "styled-components";
import { FaGlobe, FaSun, FaMoon } from "react-icons/fa";
import Universe from "../Universe/Universe";
import MyContext from "../../context/Context";
import About from "../About/About";
import { useTranslation } from "react-i18next";

interface HomeProps {
  title?: string;
}

const darkTheme = {
  background: "rgba(0,0,0,0.8)",
  navBackground: "rgba(0,0,0,0.2)",
  color: "#fafafa",
  hoverColor: "#007bff",
};

const lightTheme = {
  background: "rgba(255,255,255,0.8)",
  navBackground: "rgba(255,255,255,0.2)",
  color: "#333",
  hoverColor: "#007bff",
};

const HomeContainer = styled.div<{ theme: any }>`
  min-width: 100vw;
  min-height: 100vh;
  background: ${({ theme }) => theme.background};

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Navbar = styled.nav<{ theme: any }>`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.navBackground};
  top: 0;
  padding: 0.5rem;
  z-index: 1000;
`;

const NavItems = styled.div`
  display: flex;
  flex: 1;
`;

const NavItem = styled.button<{ active?: boolean; theme: any }>`
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  color: ${({ active, theme }) => (active ? theme.hoverColor : theme.color)};
  border-bottom: ${({ active, theme }) =>
    active ? `3px solid ${theme.hoverColor}` : "none"};
  transition: color 0.3s, border-bottom 0.3s;
  outline: none;
  font-family: pirate;
  text-transform: uppercase;
  letter-spacing: 2px;

  &:hover {
    color: ${({ theme }) => theme.hoverColor};
  }
`;

export const ThemeToggleButton = styled.button<{
  theme: any;
  tieneMargin?: any;
  esRotativo?: boolean;
}>`
  background: none;
  border: none;
  color: ${({ theme }) => theme.color};
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s;
  outline: none;
  margin-right: ${({ tieneMargin }) => (tieneMargin ? "1rem" : "0px")};

  &:hover {
    color: ${({ theme }) => theme.hoverColor};
  }
`;
const LanguageSwitcher = styled.button<{ theme: any }>`
  background: none;
  border: none;
  color: ${({ theme }) => theme.color};
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s;
  outline: none;
  margin-right: 1rem;

  &:hover {
    color: ${({ theme }) => theme.hoverColor};
  }
`;

const Content = styled.div``;

type PagesProps = "About" | "Universe";

const Home: React.FC<HomeProps> = () => {
  const [pages, setPages] = useState<PagesProps>("About");
  const { language, changeLanguage, theme, toggleTheme } =
    useContext(MyContext) || {};
  const { t } = useTranslation();

  useEffect(() => {
    document.title = "Alexis Beas";
  }, []);

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <HomeContainer>
        <Navbar>
          <NavItems>
            <NavItem
              active={pages === "About"}
              onClick={() => setPages("About")}
            >
              {t("about")}
            </NavItem>
            <NavItem
              active={pages === "Universe"}
              onClick={() => setPages("Universe")}
            >
              {t("universe")}
            </NavItem>
          </NavItems>
          <ThemeToggleButton onClick={toggleTheme} tieneMargin={true}>
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </ThemeToggleButton>
          <LanguageSwitcher
            onClick={() =>
              changeLanguage && changeLanguage(language === "en" ? "es" : "en")
            }
          >
            {language} <FaGlobe />
          </LanguageSwitcher>
        </Navbar>
        <Content>
          {pages === "About" && <About />}
          {pages === "Universe" && <Universe />}
        </Content>
      </HomeContainer>
    </ThemeProvider>
  );
};

export default Home;
