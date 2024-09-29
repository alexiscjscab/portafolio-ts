import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { IconType, IconBaseProps } from 'react-icons';
import MyContext from '../../Context/Context';

interface ButtonStyledProps {
  variant?: 'dark' | 'light';
}

const hoverAnimation = keyframes`
  0% {
    background-size: 0% 100%;
  }
  100% {
    background-size: 100% 100%;
  }
`;

const ButtonStyled = styled.button<ButtonStyledProps>`
  padding: 10px 20px;
  font-size: 16px;
  border: 2px solid
    ${({ variant }) => (variant === 'dark' ? '#00CFFF' : '#222222')};
  border-radius: 5px;
  cursor: pointer;
  transition: color 0.3s, border-color 0.3s;
  background-color: transparent;
  color: ${({ variant }) => (variant === 'dark' ? '#fafafa' : '#222222')};
  display: flex;
  align-items: center;
  outline: none;
  background-image: linear-gradient(
    90deg,
    #007bff,
    #007bff,
    #00cfff,
    #00cfff,
    #40e0d0,
    #40e0d0
  );
  background-repeat: no-repeat;
  background-size: 0% 100%;

  &:hover {
    animation: ${hoverAnimation} 2s linear forwards;
    /* color: ${({ variant }) =>
      variant === 'dark' ? '#fafafa' : '#00CFFF'}; */
    border-color: ${({ variant }) =>
      variant === 'dark' ? '#fafafa' : '#00CFFF'};
  }
`;

const IconWrapper = styled.span<{ position?: 'left' | 'right' }>`
  margin-right: ${({ position }) => (position === 'left' ? '12px' : '0')};
  margin-left: ${({ position }) => (position === 'right' ? '12px' : '0')};
`;

interface ThemeToggleButtonProps {
  onClick: () => void;
  icon?: IconType;
  text?: string;
  iconPosition?: 'left' | 'right';
  variant?: 'dark' | 'light';
}

const IconButton: React.FC<ThemeToggleButtonProps> = ({
  onClick,
  icon,
  text,
  iconPosition = 'left',
  variant,
}) => {
  const { theme } = useContext(MyContext) || {}; // Obtén el tema actual desde el contexto

  const buttonVariant = variant || theme; // Usa el tema actual si no se pasa una variante

  return (
    <ButtonStyled onClick={onClick} aria-label={text} variant={buttonVariant}>
      {icon && (
        <IconWrapper position={iconPosition}>
          {React.createElement(icon, { size: 16 } as IconBaseProps)}
        </IconWrapper>
      )}
      {text}
    </ButtonStyled>
  );
};

export default IconButton;
