import { Avatar } from "antd";
import styled from "styled-components";

export const HeaderShell = styled.header<{ $backgroundImage: string }>`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 0 1.6rem;
  color: var(--white);
  user-select: none;
  background-color: var(--primary);
  background-image: ${({ $backgroundImage }) => `url(${$backgroundImage})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(122, 31, 54, 0.84) 0%,
      rgba(122, 31, 54, 0.72) 24%,
      rgba(122, 31, 54, 0.24) 58%,
      rgba(122, 31, 54, 0.08) 100%
    );
    pointer-events: none;
  }

  .ant-badge-count {
    color: var(--primary-title);
    background-color: var(--primary-gold);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.75);
  }
`;

export const HeaderInner = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  height: 6.4rem;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem;
`;

export const LogoGroup = styled.button`
  display: flex;
  align-items: center;
  color: var(--white);
  cursor: pointer;
  border: 0;
  background: transparent;
  text-align: left;
`;

export const LogoImage = styled.img`
  width: 3.6rem;
  height: 3.6rem;
`;

export const LogoText = styled.div`
  margin-left: 1rem;
  color: var(--white);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

export const LogoTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 1.2;
`;

export const LogoSubtitle = styled.div`
  font-size: 1.4rem;
  line-height: 1.3;
  opacity: 0.96;

  @media (max-width: 991px) {
    display: none;
  }
`;

export const Actions = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const NotificationIcon = styled.div`
  font-size: 2.4rem;
  color: var(--white);
  cursor: pointer;
  line-height: 1;
`;

export const UserSection = styled.li`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-left: 1.6rem;
  color: var(--white);
`;

export const UserAvatar = styled(Avatar)`
  && {
    background-color: var(--primary);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.45);
  }
`;

export const UserTrigger = styled.a`
  color: inherit;

  &:hover,
  &:focus {
    color: var(--primary-gold);
  }
`;

export const UserName = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  color: inherit;
`;
