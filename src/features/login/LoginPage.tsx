import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthCard,
  AuthContainer,
  AuthContentLayer,
  AuthDescription,
  AuthFormFooter,
  AuthHeading,
  AuthLogoBadge,
  AuthScene,
  AuthTitle,
  BackgroundCircle,
  ForgotPasswordButton,
  LoginSubmitButton,
} from "./login-page.styles";

const backgroundCircles = [
  { delay: 0, left: -150, opacity: 0.4, size: 300, top: 200 },
  { delay: 0.3, left: -300, opacity: 0.3, size: 600, top: 50 },
  { delay: 0.6, left: -450, opacity: 0.2, size: 900, top: -100 },
  { delay: 0.9, left: -600, opacity: 0.1, size: 1200, top: -250 },
  { delay: 1.2, left: -750, opacity: 0.05, size: 1500, top: -400 },
];

const LoginPage: FC = () => {
  const navigate = useNavigate();

  const onSubmitForm = () => {
    navigate("/", { replace: true });
  };

  return (
    <AuthContainer>
      <AuthScene aria-hidden="true">
        {backgroundCircles.map((circle) => (
          <BackgroundCircle
            key={`${circle.size}-${circle.delay}`}
            $delay={circle.delay}
            $left={circle.left}
            $opacity={circle.opacity}
            $size={circle.size}
            $top={circle.top}
          />
        ))}
      </AuthScene>

      <AuthContentLayer>
        <AuthCard>
          <AuthHeading>
            <AuthLogoBadge>OMC</AuthLogoBadge>
            <AuthTitle>Đăng nhập</AuthTitle>
            <AuthDescription>
              Xin chào! Vui lòng đăng nhập để tiếp tục
            </AuthDescription>
          </AuthHeading>

          <Form name="login" layout="vertical" onFinish={onSubmitForm}>
            <Form.Item
              name="username"
              label="Tài khoản"
              rules={[{ required: true, message: "Vui lòng nhập tài khoản" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email/Username"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input.Password
                placeholder="Password"
                prefix={<LockOutlined />}
                size="large"
              />
            </Form.Item>

            <AuthFormFooter>
              <ForgotPasswordButton type="button">
                Quên mật khẩu?
              </ForgotPasswordButton>
            </AuthFormFooter>

            <Form.Item>
              <LoginSubmitButton
                type="primary"
                htmlType="submit"
                block
                size="large"
              >
                Đăng nhập
              </LoginSubmitButton>
            </Form.Item>
          </Form>
        </AuthCard>
      </AuthContentLayer>
    </AuthContainer>
  );
};

export default LoginPage;
