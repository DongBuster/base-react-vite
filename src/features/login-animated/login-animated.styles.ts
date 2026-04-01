import { Button } from "antd";
import styled, { css } from "styled-components";

type AuthShellProps = {
  $isSignIn: boolean;
};

type FormPaneProps = {
  $active: boolean;
  $side: "left" | "right";
};

export const AnimatedAuthPage = styled.div`
  min-height: 100vh;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3.2rem 1.6rem;
  background:
    radial-gradient(
      circle at top left,
      rgba(122, 31, 54, 0.15),
      transparent 32%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(23, 143, 226, 0.14),
      transparent 28%
    ),
    linear-gradient(135deg, #c9dff5 0%, #eaf1f9 100%);
`;

export const AuthShell = styled.div<AuthShellProps>`
  position: relative;
  width: min(100%, 96rem);
  min-height: 60rem;
  overflow: hidden;
  border-radius: 3.2rem;
  background: var(--surface-elevated);
  box-shadow: 0 2.4rem 6rem rgba(15, 23, 42, 0.16);

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    min-height: auto;
  }
`;

export const FormsViewport = styled.div`
  position: relative;
  width: 100%;
  min-height: 60rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 900px) {
    display: block;
    min-height: auto;
    padding-top: 26rem;
  }
`;

export const FormPane = styled.section<FormPaneProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
  transition:
    opacity 0.55s ease,
    transform 0.55s ease,
    visibility 0.55s ease;

  min-height: 60rem;

  ${({ $side }) =>
    $side === "left"
      ? css`
          grid-column: 1;
        `
      : css`
          grid-column: 2;
        `}

  ${({ $active, $side }) =>
    $active
      ? css`
          opacity: 1;
          visibility: visible;
          transform: translateX(0);
          z-index: 2;
        `
      : css`
          opacity: 0;
          visibility: hidden;
          transform: translateX(${$side === "left" ? "-6%" : "6%"});
          z-index: 1;
          pointer-events: none;
        `}

  @media (max-width: 900px) {
    position: relative;
    width: 100%;
    min-height: 52rem;
    padding: 3.2rem 2.4rem;
    display: ${({ $active }) => ($active ? "flex" : "none")};
    opacity: 1;
    visibility: visible;
    transform: none;
  }
`;

export const FormCard = styled.div`
  width: min(100%, 36rem);
`;

export const FormHeader = styled.div`
  margin-bottom: 2.4rem;
  text-align: center;
`;

export const FormTitle = styled.h1`
  margin: 0 0 1.2rem;
  color: var(--text-primary);
  font-size: clamp(3rem, 3vw, 4rem);
  font-weight: 700;
  line-height: 1.08;
`;

export const FormSubtitle = styled.p`
  margin: 0;
  color: var(--text-secondary);
  font-size: 1.4rem;
  line-height: 1.6;
`;

export const SocialRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
`;

export const SocialButton = styled.button`
  width: 4.4rem;
  height: 4.4rem;
  border: 1px solid rgba(122, 31, 54, 0.12);
  border-radius: 1.2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-elevated);
  color: var(--primary);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(122, 31, 54, 0.3);
    background-color: rgba(122, 31, 54, 0.04);
  }
`;

export const DividerText = styled.p`
  margin: 0 0 2rem;
  color: var(--text-secondary);
  text-align: center;
  font-size: 1.3rem;
`;

export const PrimaryAction = styled(Button)`
  && {
    height: 4.8rem;
    border-radius: 1.4rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    background: var(--gradient-primary);
    border: 0;
  }
`;

export const OverlayPanel = styled.div<AuthShellProps>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 50%;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
  border-radius: ${({ $isSignIn }) =>
    $isSignIn ? "12rem 0 0 12rem" : "0 12rem 12rem 0"};
  color: var(--white);
  background:
    radial-gradient(
      circle at top left,
      rgba(242, 166, 13, 0.18),
      transparent 28%
    ),
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.08),
      rgba(255, 255, 255, 0.02)
    ),
    linear-gradient(135deg, var(--primary) 0%, var(--primary-sub) 100%);
  box-shadow: 0 2rem 4rem rgba(122, 31, 54, 0.28);
  transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
  transform: translateX(${({ $isSignIn }) => ($isSignIn ? "100%" : "0%")});

  @media (max-width: 900px) {
    top: 1.6rem;
    left: 1.6rem;
    right: 1.6rem;
    width: auto;
    min-height: 22rem;
    bottom: auto;
    border-radius: 2.4rem;
    transform: none;
  }
`;

export const OverlayContent = styled.div`
  max-width: 31rem;
  text-align: center;
`;

export const OverlayEyebrow = styled.p`
  margin: 0 0 1rem;
  font-size: 1.3rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.78;
`;

export const OverlayTitle = styled.h2`
  margin: 0 0 1.2rem;
  font-size: clamp(3.4rem, 4vw, 4.8rem);
  line-height: 1.02;
  font-weight: 700;
  color: inherit;
`;

export const OverlayDescription = styled.p`
  margin: 0 0 2.8rem;
  color: rgba(255, 255, 255, 0.88);
  font-size: 1.6rem;
  line-height: 1.6;
`;

export const SecondaryGhostAction = styled.button`
  min-width: 16rem;
  height: 4.6rem;
  padding: 0 2.4rem;
  border: 1px solid rgba(255, 255, 255, 0.52);
  border-radius: 999px;
  background: transparent;
  color: inherit;
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background: rgba(242, 166, 13, 0.14);
    border-color: rgba(242, 166, 13, 0.68);
  }
`;
