import styled, { CSSProperties } from 'styled-components';

interface FlexDivProps {
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  flexDirection?: CSSProperties['flexDirection'];
}

export const FlexDiv = styled.div<FlexDivProps>`
  display: flex;
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
  align-items: ${(props) => props.alignItems || 'stretch'};
  flex-direction: ${(props) => props.flexDirection || 'row'};
`;
