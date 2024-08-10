import { useContext } from "react";
import MyContext from "../../context/Context";
import StarryBackground from "../../components/SistemaSolar/Universe";
import { ThemeToggleButton } from "../Home/Home";
import styled from "styled-components";
import { FaMoon } from "react-icons/fa";
import { TextAbout } from "../About/TextAbout";
import { useTranslation } from "react-i18next";

const Universe = () => {
  const { theme, toggleTheme } = useContext(MyContext) || {};
  const { t } = useTranslation();

  const DivUniverse = styled.div<{ esVisible: boolean }>`
    display: ${({ esVisible }) => !esVisible && "none"};
  `;

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <DivUniverse esVisible={theme === "dark"}>
        <StarryBackground />
      </DivUniverse>
      {theme == "light" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <TextAbout margin>{t("change")}</TextAbout>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ThemeToggleButton onClick={toggleTheme}>
              <FaMoon size={100} />{" "}
            </ThemeToggleButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default Universe;
