import { ButtonHTMLAttributes } from "react";
import styled from "@emotion/styled";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "lg" | "md" | "sm";
}

export default function Button({
  children,
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <StyledButton size={size} {...props}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button<{ size?: "lg" | "md" | "sm" }>`
  padding: 1rem;
  background: url("/assets/text-background.png") no-repeat center center;
  background-size: cover;
  font-size: ${({ size }) => {
    switch (size) {
      case "lg":
        return "50px";
      case "sm":
        return "20px";
      default:
        return "40px";
    }
  }};
  color: #fff;
  transition: transform 0.4s ease;

  /* Define styles for each size option */
  ${({ size }) => {
    switch (size) {
      case "lg":
        return `
          min-width: 30rem;
          min-height: 10rem;
        `;
      case "sm":
        return `
          min-width: 8rem;
          min-height: 3rem;
        `;
      default:
        return `
          min-width: 22rem;
          min-height: 8rem;
        `;
    }
  }}

  &:hover {
    transform: scale(1.1);
  }
`;
