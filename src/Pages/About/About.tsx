import styled, { keyframes } from "styled-components";
import TypedName from "./NameAnimated";
import { TextAboutMe } from "./TextAbout";
import { useState } from "react";
import IconButton from "../../components/Buttons/IconButton";

// Contenedor principal
const AboutContainer = styled.section`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

// Animación del borde
const borderAnimation = keyframes`
  0% {
    border-color: #007BFF;
    box-shadow: 0 0 10px #007BFF;
  }
  25% {
    border-color: #00CFFF;
    box-shadow: 0 0 10px #00CFFF;
  }
  50% {
    border-color: #40E0D0;
    box-shadow: 0 0 10px #40E0D0;
  }
  75% {
    border-color: #1E90FF;
    box-shadow: 0 0 10px #1E90FF;
  }
  100% {
    border-color: #4682B4;
    box-shadow: 0 0 10px #4682B4;
  }
`;

// Estilo del Card
const Card = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  max-width: 800px;
  height: auto;
  border: 3px solid #007bff;
  border-radius: 10px;
  padding: 20px;
  animation: ${borderAnimation} 3s linear infinite;
  transition: transform 0.3s, box-shadow 0.3s;
  flex-direction: column;

  // Media queries para ajustar el tamaño del Card en dispositivos más pequeños
  @media (max-width: 768px) {
    width: 90%;
    padding: 15px;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 10px;
  }

  &:hover {
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.5);
    /* transform: perspective(800px) rotateY(-10deg); */
  }
`;

// Estilo del contenedor de texto
const TextDiv = styled.div`
  width: 100%;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px) scale(0.95) rotate(0deg);
    color: red;
    filter: blur(10px);
  }
  50% {
    opacity: 0.5;
    transform: translateY(-10px) scale(1.05) rotate(10deg);
    color: orange;
    filter: blur(5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1) rotate(0deg);
    color: black;
    filter: blur(0);
  }
`;

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  animation: ${fadeIn} 1s ease-in-out; // Aplica la animación de desvanecimiento
`;

const NameContainer = styled.div`
  height: 50px;
  margin-bottom: 1rem;
  font-size: 40px;
 
  // Ajusta el tamaño del texto en pantallas más pequeñas
  @media (max-width: 768px) {
    font-size: 30px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

// Estilo del contenedor centrado
const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;

const StyledTypedName = styled(TypedName)``;

const About = () => {
  const arrayTexto: string[] = ["Alexis Beas", "Front Developer"];
  const [active, setActive] = useState<boolean>(false);

  return (
    <AboutContainer>
      <Card>
        <ColumnDiv>
          <TextDiv>
            <NameContainer>
              <StyledTypedName
                texto={arrayTexto}
                speed={100}
                size={"18px"}
                setActive={setActive}
                active={active}
              />
            </NameContainer>
            <TextAboutMe />
          </TextDiv>
          <CenteredDiv>
            <IconButton onClick={() => {}} text="Descargar" />
          </CenteredDiv>
        </ColumnDiv>
      </Card>
    </AboutContainer>
  );
};

export default About;
