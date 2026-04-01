import { Typography } from "antd";
import styled from "styled-components";

const { Paragraph } = Typography;

export const TestPageContainer = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 2.4rem 1.6rem;
`;

export const SectionStack = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 2.4rem;
`;

export const InfoBlock = styled.div`
  margin-bottom: 1.6rem;
`;

export const ContentStack = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1.6rem;
`;

export const StatusRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.2rem;
`;

export const SecondaryParagraph = styled(Paragraph)`
  && {
    margin-bottom: 0;
  }
`;
