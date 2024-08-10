import React, { useEffect, useRef, useContext } from "react";
import Typed from "typed.js";
import MyContext from "../../context/Context"; // Asegúrate de importar tu contexto

interface TypedNameProps {
  texto: string[];
  speed: number;
  size: string;
  setActive: (active: boolean) => void;
  active: boolean;
}

const TypedName: React.FC<TypedNameProps> = ({
  texto,
  speed,
  size,
  setActive,
  active,
}) => {
  const {theme} = useContext(MyContext) || {}
  const typedRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (typedRef.current) {
      const typedOptions = {
        strings: texto,
        typeSpeed: speed,
        loop: false,
        startDelay: 250,
        showCursor: false,
        smartBackspace: true,
        backSpeed: 50,
        fadeOut: true,
        fadeOutClass: "typed-fade-out",
        fadeOutDelay: 500,
        onComplete: () => setActive(true),
      };

      const typed = new Typed(typedRef.current, typedOptions);

      return () => {
        typed.destroy();
      };
    }
  }, [texto, active, setActive, speed]);

  // Definir los colores según el tema
  const textColor = theme === "dark" ? "#fafafa" : "#333"; // Cambia los colores según el tema

  return (
    <p
      ref={typedRef}
      style={{
        fontSize: size,
        padding: "20px",
        marginBottom: "10px",
        textAlign: "center",
        color: textColor, // Usa el color basado en el tema
      }}
    ></p>
  );
};

export default TypedName;
