import styled from 'styled-components';

const TextAbout = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #000;
  max-width: 600px;
  margin: 0 auto;
`;

export const TextAboutMe = () => {
  return (
    <TextAbout>
      Soy desarrollador web con dos años de experiencia en frontend utilizando React, Node y TypeScript. Disfruto de los desafíos creativos y la colaboración en equipo con metodologías Scrum. Actualmente, trabajo en el área de Comex del Banco Galicia, participando en diversos proyectos.
    </TextAbout>
  );
};
