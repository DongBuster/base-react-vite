import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import type { FC } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AnimatedAuthPage,
  AuthShell,
  DividerText,
  FormCard,
  FormHeader,
  FormPane,
  FormSubtitle,
  FormTitle,
  FormsViewport,
  OverlayContent,
  OverlayDescription,
  OverlayEyebrow,
  OverlayPanel,
  OverlayTitle,
  PrimaryAction,
  SecondaryGhostAction,
  SocialButton,
  SocialRow,
} from "./login-animated.styles";
import {
  FaFacebookF,
  FaGithub,
  FaGoogle,
  FaLinkedinIn,
} from "react-icons/fa";

type AuthMode = "sign-in" | "sign-up";

const LoginAnimatedPage: FC = () => {
  const [mode, setMode] = useState<AuthMode>("sign-up");
  const navigate = useNavigate();
  const isSignIn = mode === "sign-in";

  const handleSignIn = () => {
    navigate("/", { replace: true });
  };

  const handleSignUp = () => {
    navigate("/", { replace: true });
  };

  return (
    <AnimatedAuthPage>
      <AuthShell $isSignIn={isSignIn}>
        <FormsViewport>
          <FormPane $active={isSignIn} $side="left">
            <FormCard>
              <FormHeader>
                <FormTitle>Sign In</FormTitle>
                <FormSubtitle>
                  Use your account to continue into the workspace.
                </FormSubtitle>
              </FormHeader>

              <SocialRow>
                <SocialButton type="button" aria-label="Sign in with Google">
                  <FaGoogle />
                </SocialButton>
                <SocialButton type="button" aria-label="Sign in with Facebook">
                  <FaFacebookF />
                </SocialButton>
                <SocialButton type="button" aria-label="Sign in with GitHub">
                  <FaGithub />
                </SocialButton>
                <SocialButton type="button" aria-label="Sign in with LinkedIn">
                  <FaLinkedinIn />
                </SocialButton>
              </SocialRow>

              <DividerText>or use your email account</DividerText>

              <Form layout="vertical" onFinish={handleSignIn}>
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: "Please enter your email" }]}
                >
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="Email"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "Please enter your password" }]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                    size="large"
                  />
                </Form.Item>

                <Form.Item>
                  <PrimaryAction type="primary" htmlType="submit" block>
                    Sign In
                  </PrimaryAction>
                </Form.Item>
              </Form>
            </FormCard>
          </FormPane>

          <FormPane $active={!isSignIn} $side="right">
            <FormCard>
              <FormHeader>
                <FormTitle>Create Account</FormTitle>
                <FormSubtitle>
                  Register with your details to start using the platform.
                </FormSubtitle>
              </FormHeader>

              <SocialRow>
                <SocialButton type="button" aria-label="Sign up with Google">
                  <FaGoogle />
                </SocialButton>
                <SocialButton type="button" aria-label="Sign up with Facebook">
                  <FaFacebookF />
                </SocialButton>
                <SocialButton type="button" aria-label="Sign up with GitHub">
                  <FaGithub />
                </SocialButton>
                <SocialButton type="button" aria-label="Sign up with LinkedIn">
                  <FaLinkedinIn />
                </SocialButton>
              </SocialRow>

              <DividerText>or use your email for registration</DividerText>

              <Form layout="vertical" onFinish={handleSignUp}>
                <Form.Item
                  name="fullName"
                  rules={[{ required: true, message: "Please enter your name" }]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Name"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  rules={[{ required: true, message: "Please enter your email" }]}
                >
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="Email"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "Please enter your password" }]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                    size="large"
                  />
                </Form.Item>

                <Form.Item>
                  <PrimaryAction type="primary" htmlType="submit" block>
                    Sign Up
                  </PrimaryAction>
                </Form.Item>
              </Form>
            </FormCard>
          </FormPane>
        </FormsViewport>

        <OverlayPanel $isSignIn={isSignIn}>
          <OverlayContent>
            <OverlayEyebrow>{isSignIn ? "New here?" : "Already a member?"}</OverlayEyebrow>
            <OverlayTitle>
              {isSignIn ? "Join Us Today!" : "Welcome Back!"}
            </OverlayTitle>
            <OverlayDescription>
              {isSignIn
                ? "Create an account to unlock the full experience and manage everything in one place."
                : "Enter your personal details to sign in and continue using all of our site features."}
            </OverlayDescription>
            <SecondaryGhostAction
              type="button"
              onClick={() => setMode(isSignIn ? "sign-up" : "sign-in")}
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </SecondaryGhostAction>
          </OverlayContent>
        </OverlayPanel>
      </AuthShell>
    </AnimatedAuthPage>
  );
};

export default LoginAnimatedPage;
