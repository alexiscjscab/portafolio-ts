import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

interface TypedNameProps {
  texto: string[];
  speed: number;
  size: string;
  setActive: any;
  active: boolean;
}

const TypedName: React.FC<TypedNameProps> = ({
  texto,
  speed,
  size,
  setActive,
  active,
}) => {
  const typedRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // if (!active) {
    if (typedRef.current) {
      const typedOptions = {
        strings: texto,
        typeSpeed: speed, // Aumenta la velocidad de escritura
        loop: true, // se repite
        startDelay: 250, // Agrega un retraso antes de iniciar la animación
        showCursor: false, // Muestra el cursor de escritura
        // cursorChar: '|', // Carácter del cursor
        smartBackspace: true, // Retroceso inteligente
        backSpeed: 50, // Velocidad de retroceso
        fadeOut: true, // Desvanecimiento al final de la animación
        fadeOutClass: "typed-fade-out", // Clase CSS para el desvanecimiento
        fadeOutDelay: 500, // Retraso antes de desvanecer
        onComplete: () => setActive(true), // Función a ejecutar al completarse la animación
      };

      const typed = new Typed(typedRef.current, typedOptions);

      return () => {
        typed.destroy();
      };
    }
    // }
  }, [texto, active]);

  return (
    <p
      ref={typedRef}
      style={{
        fontSize: size,
        padding: "20px",
        marginBottom: "10px",
        textAlign: "center",
        color: "#fafafa",
      }}
    ></p>
  );
};

export default TypedName;
