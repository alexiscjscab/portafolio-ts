import React, { useEffect, useState, useContext } from "react";
import styled, { ThemeProvider } from "styled-components";
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

const HomeContainer = styled.div<{ theme: typeof darkTheme | typeof lightTheme }>`
  min-width: 100vw;
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  padding: 10px;
  box-sizing: border-box;

  @media (min-width: 481px) {
    padding: 15px;
  }
`;

const Navbar = styled.nav<{ theme: typeof darkTheme | typeof lightTheme }>`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.navBackground};
  padding: 0.5rem;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavItems = styled.div`
  display: flex;
  flex: 1;
`;

const NavItem = styled.button<{ active?: boolean; theme: typeof darkTheme | typeof lightTheme }>`
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  color: ${({ active, theme }) => (active ? theme.hoverColor : theme.color)};
  border-bottom: ${({ active, theme }) => active ? `3px solid ${theme.hoverColor}` : "none"};
  transition: color 0.3s, border-bottom 0.3s;
  outline: none;
  font-family: 'Pirate', sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;

  &:hover {
    color: ${({ theme }) => theme.hoverColor};
  }
`;

export const ThemeToggleButton = styled.button<{ theme: typeof darkTheme | typeof lightTheme; tieneMargin?: boolean }>`
  background: none;
  border: none;
  color: ${({ theme }) => theme.color};
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s;
  outline: none;
  margin-right: ${({ tieneMargin }) => (tieneMargin ? "1rem" : "0")};

  &:hover {
    color: ${({ theme }) => theme.hoverColor};
  }
`;

const LanguageSwitcher = styled.button<{ theme: typeof darkTheme | typeof lightTheme }>`
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

const Content = styled.div`
  margin-top: 1rem;
`;

type PagesProps = "About" | "Universe";

const navItems = [
  { id: "About", label: "about" },
  { id: "Universe", label: "universe" },
];

const Home: React.FC<HomeProps> = () => {
  const [pages, setPages] = useState<PagesProps>("About");
  const { language, changeLanguage, theme } = useContext(MyContext) || {};
  const { t } = useTranslation();

  useEffect(() => {
    document.title = "Alexis Beas";
  }, []);

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <HomeContainer theme={theme === "dark" ? darkTheme : lightTheme}>
        <Navbar theme={theme === "dark" ? darkTheme : lightTheme}>
          <NavItems>
            {navItems.map(({ id, label }) => (
              <NavItem
                key={id}
                active={pages === id}
                onClick={() => setPages(id as PagesProps)}
                theme={theme === "dark" ? darkTheme : lightTheme}
              >
                {t(label)}
              </NavItem>
            ))}
          </NavItems>
          <ThemeToggleButton theme={theme === "dark" ? darkTheme : lightTheme} tieneMargin>
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </ThemeToggleButton>
          <LanguageSwitcher theme={theme === "dark" ? darkTheme : lightTheme} onClick={() =>
            changeLanguage && changeLanguage(language === "en" ? "es" : "en")
          }>
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
