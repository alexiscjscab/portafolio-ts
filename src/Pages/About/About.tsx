import { useContext, useEffect, useState } from 'react';
import styled, { keyframes, DefaultTheme } from 'styled-components';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import IconButton from '../../components/Buttons/IconButton';
import { TextAboutMe } from '../../components/Text/TextAbout';
import TypedName from '../../components/Text/NameAnimated';
import MyContext from '../../Context/Context';

// Define tus temas
const darkTheme: DefaultTheme = {
  background: '#333',
  color: '#fff',
};

const lightTheme: DefaultTheme = {
  background: '#fff',
  color: '#000',
};

// Contenedor principal
const AboutContainer = styled.section<{ theme: DefaultTheme }>`
  display: flex;
  justify-content: center;
  padding: 20px;
  background: ${({ theme }) => theme.background}; // Cambio según el tema

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
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
const Card = styled.div<{ theme: DefaultTheme }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  min-height: 300px; // Altura mínima para evitar que el card se reduzca demasiado
  border: 3px solid #007bff;
  border-radius: 10px;
  padding: 20px;
  animation: ${borderAnimation} 3s linear infinite;
  transition: transform 0.3s, box-shadow 0.3s;
  flex-direction: column;
  color: ${({ theme }) => theme.color}; // Cambio según el tema

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
  }
`;

// Estilo del contenedor de texto
const TextDiv = styled.div`
  width: 100%;

  @media (max-width: 300px) {
    display: none;
  }
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

const SocialIcons = styled.div<{ theme: DefaultTheme }>`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 1rem;

  a {
    color: ${({ theme }) => theme.color};
    font-size: 24px;
    transition: color 0.3s ease, filter 0.3s ease, transform 0.3s ease;

    &:hover {
      color: #00cfff; /* Celeste para hover */
      filter: drop-shadow(0 0 10px #00cfff) brightness(1.2);
      transform: scale(1.1); /* Expande el ícono al hacer hover */
    }
  }
`;

const StyledTypedName = styled(TypedName)``;

const About = () => {
  const { t } = useTranslation();
  const { language, theme: contextTheme } = useContext(MyContext) || {};
  const [txt, setTxt] = useState<string[]>([]);
  const [currentTheme, setCurrentTheme] = useState<DefaultTheme>(lightTheme);

  useEffect(() => {
    setTxt([t('frontDeveloper'), t('alexisBeas')]);

    // Mapear el tema del contexto a DefaultTheme
    const themeMap: Record<string, DefaultTheme> = {
      dark: darkTheme,
      light: lightTheme,
    };

    setCurrentTheme(themeMap[contextTheme || 'dark'] || lightTheme);
  }, [language, t, contextTheme]);

  return (
    <AboutContainer theme={currentTheme}>
      <Card theme={currentTheme}>
        <ColumnDiv>
          <TextDiv>
            <NameContainer>
              <StyledTypedName
                texto={txt}
                speed={100}
                size={'18px'}
                setActive={() => {}}
                active={false}
              />
            </NameContainer>
            <TextAboutMe />
          </TextDiv>
          <CenteredDiv>
            <IconButton onClick={() => {}} text={t('download')} />
          </CenteredDiv>
          <SocialIcons theme={currentTheme}>
            <a
              href='https://github.com/alexiscjscab'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaGithub />
            </a>
            <a
              href='https://ar.linkedin.com/in/alexis-beas-dev'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaLinkedin />
            </a>
          </SocialIcons>
        </ColumnDiv>
      </Card>
    </AboutContainer>
  );
};

export default About;
