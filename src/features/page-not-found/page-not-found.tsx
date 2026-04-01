import { Button } from "antd";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  PageNotFoundContainer,
  StyledResult,
} from "./page-not-found.styles";

const PageNotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <PageNotFoundContainer>
      <StyledResult
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button onClick={() => navigate("/")} type="primary">
            Back Home
          </Button>
        }
      />
    </PageNotFoundContainer>
  );
};

export default PageNotFound;
