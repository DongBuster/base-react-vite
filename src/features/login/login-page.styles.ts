import { Button, Card } from "antd";
import styled, { css, keyframes } from "styled-components";

const circleScale = keyframes`
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.1);
  }
`;

type BackgroundCircleProps = {
  $delay: number;
  $left: number;
  $opacity: number;
  $size: number;
  $top: number;
};

export const AuthContainer = styled.div`
  position: relative;
  display: flex;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--gradient-primary);
`;

export const AuthScene = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
`;

export const BackgroundCircle = styled.div<BackgroundCircleProps>`
  position: absolute;
  border-radius: 999px;
  background: var(--white);
  animation: ${circleScale} 3s ease-in-out infinite alternate;
  animation-timing-function: cubic-bezier(0.6, 0, 0.4, 1);

  ${({ $delay, $left, $opacity, $size, $top }) => css`
    top: ${$top}px;
    left: ${$left}px;
    width: ${$size}px;
    height: ${$size}px;
    opacity: ${$opacity};
    animation-delay: ${$delay}s;
  `}
`;

export const AuthContentLayer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 2.4rem;
`;

export const AuthCard = styled(Card)`
  width: min(100%, 44rem);
  border: 0;
  border-radius: 2.4rem;
  background: var(--surface-elevated);
  box-shadow: var(--shadow);

  .ant-card-body {
    padding: clamp(2.4rem, 4vw, 3.2rem);
  }
`;

export const AuthHeading = styled.div`
  margin-bottom: 2.4rem;
  text-align: center;
`;

export const AuthLogoBadge = styled.div`
  display: flex;
  height: clamp(4.8rem, 6vw, 6.4rem);
  width: clamp(4.8rem, 6vw, 6.4rem);
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.2rem;
  border-radius: 1.4rem;
  background-color: var(--primary);
  color: var(--white);
  font-size: clamp(1.8rem, 2.6vw, 2rem);
  font-weight: 700;
`;

export const AuthTitle = styled.div`
  margin-bottom: 0.8rem;
  color: var(--text-primary);
  font-size: clamp(2rem, 3vw, 2.8rem);
  font-weight: 600;
  line-height: 1.2;
`;

export const AuthDescription = styled.div`
  color: var(--text-secondary);
  font-size: clamp(1.4rem, 2.2vw, 1.6rem);
  line-height: 1.5;
`;

export const AuthFormFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 1.6rem;
`;

export const ForgotPasswordButton = styled.button`
  border: 0;
  padding: 0;
  background: transparent;
  color: var(--primary);
  font-size: clamp(1.4rem, 2vw, 1.6rem);
  cursor: pointer;

  &:hover {
    color: var(--primary-sub);
  }
`;

export const LoginSubmitButton = styled(Button)`
  && {
    background-color: var(--primary);
    border-color: var(--primary);
  }

  &&:hover,
  &&:focus {
    background-color: var(--btn-hover-primary);
    border-color: var(--btn-hover-primary);
  }
`;
