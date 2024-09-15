import { useContext } from "react";
import { useTranslation } from "react-i18next";
import MyContext from "../context/Context";
import styled from "styled-components";

export const TextAbout = styled.div<{ textColor?: string, margin?: boolean }>`
  font-size: 16px;
  line-height: 1.6;
  color: ${({ textColor }) => textColor}; // Usa la prop personalizada
  max-width: 600px;
  margin: 0 auto;
  margin-bottom: ${({margin}) => margin && '2rem'};
  @media (max-width: 300px) {
    display: none;
  }
`;

export const TextAboutMe = () => {
  const { t } = useTranslation();
  const { theme } = useContext(MyContext) || {}; // Obtén el tema actual desde el contexto

  const textColor = theme === "dark" ? "#fafafa" : "#333";

  return <TextAbout textColor={textColor}>{t("aboutMeText")}</TextAbout>;
};
