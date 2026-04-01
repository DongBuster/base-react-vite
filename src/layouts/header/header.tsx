import {
  BellFilled,
  DownOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import headerBg from "@assets/header.png";
import logoBCA from "@assets/logoBCA.png";
import { HOME_PATH, LOGIN_PATH } from "@shared/constants/path";
import tokenManager from "@shared/utils/tokenManager";
import type { MenuProps } from "antd";
import { Badge, Dropdown, Space } from "antd";
import type { FC } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal, {
  type ChangePasswordValues,
} from "./change-password-modal";
import {
  Actions,
  HeaderInner,
  HeaderShell,
  LogoGroup,
  LogoImage,
  LogoSubtitle,
  LogoText,
  LogoTitle,
  NotificationIcon,
  UserAvatar,
  UserName,
  UserSection,
  UserTrigger,
} from "./header.styles";

const Header: FC = () => {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [unreadCount] = useState<number>(0);
  const isOverviewPage = location.pathname === "/overviews";
  const navigate = useNavigate();

  const updatePasswordAccount = async (
    oldPassWord: string,
    newPassWord: string,
  ) => {
    console.log("UPDATE::", oldPassWord, newPassWord);
    try {
      setConfirmLoading(true);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleOpenChangePasswordModal = () => {
    setIsChangePasswordOpen(true);
  };

  const handleCloseChangePasswordModal = () => {
    setIsChangePasswordOpen(false);
  };

  const handleSubmitChangePassword = (values: ChangePasswordValues) => {
    if (values.newPassword !== values.confirmPassword) {
      return;
    }

    updatePasswordAccount(values.oldPassword, values.newPassword);
  };

  const handleLogout = () => {
    tokenManager.removeAccessToken();
    tokenManager.removeRefreshToken();
    navigate(`/${LOGIN_PATH}`, { replace: true });
  };

  const items: MenuProps["items"] = [
    {
      icon: <SearchOutlined />,
      label: "Trợ giúp",
      key: "0",
    },
    {
      icon: <QuestionCircleOutlined />,
      label: "Đổi mật khẩu",
      key: "1",
    },
    {
      type: "divider",
    },
    {
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      key: "3",
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "1") {
      handleOpenChangePasswordModal();
      return;
    }

    if (key === "3") {
      handleLogout();
    }
  };

  return (
    <div className={`sticky top-0 ${isOverviewPage ? "z-1010" : ""}`}>
      <HeaderShell $backgroundImage={headerBg}>
        <HeaderInner>
          <LogoGroup
            type="button"
            onClick={() => {
              navigate(`/${HOME_PATH}`);
            }}
          >
            <LogoImage src={logoBCA} alt="Logo" />
            <LogoText>
              <LogoTitle>Tỉnh Hà Tĩnh</LogoTitle>
              <LogoSubtitle>Trung tâm quản lý điều hành tập trung</LogoSubtitle>
            </LogoText>
          </LogoGroup>

          <Actions>
            <li>
              <Badge count={unreadCount}>
                <NotificationIcon>
                  <BellFilled />
                </NotificationIcon>
              </Badge>
            </li>
            <UserSection>
              <UserAvatar icon={<UserOutlined />} />
              <Dropdown
                menu={{ items, onClick: handleMenuClick }}
                trigger={["click"]}
              >
                <UserTrigger onClick={(e) => e.preventDefault()}>
                  <Space>
                    <UserName>Nguyễn Văn Anh</UserName>
                    <DownOutlined />
                  </Space>
                </UserTrigger>
              </Dropdown>
            </UserSection>
          </Actions>
        </HeaderInner>
      </HeaderShell>

      <ChangePasswordModal
        open={isChangePasswordOpen}
        confirmLoading={confirmLoading}
        onCancel={handleCloseChangePasswordModal}
        onSubmit={handleSubmitChangePassword}
      />
    </div>
  );
};

export default Header;
