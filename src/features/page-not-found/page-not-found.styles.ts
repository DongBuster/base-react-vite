import { Result } from "antd";
import styled from "styled-components";

export const PageNotFoundContainer = styled.div`
  display: grid;
  min-height: calc(100vh - 14rem);
  place-items: center;
  padding: 2.4rem 1.6rem;
  background: var(--bg-primary);
`;

export const StyledResult = styled(Result)`
  width: min(100%, 64rem);
  border-radius: 2.4rem;
  background: var(--surface-elevated);
  box-shadow: var(--shadow);
`;
