import { ButtonHTMLAttributes } from "react";
import styled from "@emotion/styled";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "xs" | "md" | "sm";
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

const StyledButton = styled.button<{ size?: "xs" | "md" | "sm" }>`
  padding: 1rem;
  background: url("/assets/text-background.png") no-repeat center center;
  background-size: cover;
  font-size: ${({ size }) => {
    switch (size) {
      case "xs":
        return "10px";
      case "sm":
        return "20px";
      default:
        return "40px";
    }
  }};
  color: #fff;
  transition: transform 0.4s ease;
  &:hover {
    transform: scale(1.1);
  }

  ${({ size }) => {
    switch (size) {
      case "xs":
        return `
          min-width: 5rem;
          min-height: 2rem;
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
`;
