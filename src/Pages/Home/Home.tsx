import React, { useEffect, useState } from "react";
import About from "../About/About";
import styled from "styled-components";

interface HomeProps {
  title?: string;
}

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.9); // Fondo transparente
  position: fixed;
  top: 0;
  width: 100%;
  padding: 0.5rem;
  z-index: 1000; // Asegura que el navbar esté por encima del contenido
`;

const NavItem = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.875rem; // Tamaño de fuente más pequeño
  cursor: pointer;
  color: ${({ active }) => (active ? '#007bff' : '#fafafa')};
  border-bottom: ${({ active }) => (active ? '3px solid #007bff' : 'none')};
  transition: color 0.3s, border-bottom 0.3s;
  outline: none;
  font-family: pirate;
  text-transform: uppercase;
  letter-spacing: 2px;

  &:hover {
    color: #007bff;
  }
`;

// Estilo para el contenido principal que se muestra debajo del navbar
const Content = styled.div`
  margin-top: 60px; // Ajusta este valor según la altura del navbar
  padding: 20px;
`;

type PagesProps = "About" | "Contact";

const Home: React.FC<HomeProps> = () => {
  const [pages, setPages] = useState<PagesProps>("About");



  useEffect(() => {
    document.title = 'Alexis Beas'
  }, []);

  return (
    <>
      <Navbar>
        <NavItem active={pages === "About"} onClick={() => setPages("About")}>
          About
        </NavItem>
        <NavItem
          active={pages === "Contact"}
          onClick={() => setPages("Contact")}
        >
          Contact
        </NavItem>
      </Navbar>
      <Content>
        {pages === "About" && <About />}
        {pages === "Contact" && <div>Contact Page</div>}
      </Content>
    </>
  );
};

export default Home;
