import type { ConfigProviderProps, ThemeConfig } from "antd";
import viVN from "antd/locale/vi_VN";

const palette = {
  bgPrimary: "rgba(246, 243, 244, 1)",
  borderPrimary: "#bcbebe",
  borderSecondary: "#e7e7e7",
  error: "#e63232",
  goldSoft: "rgba(242, 166, 13, 0.1)",
  hoverPrimary: "#e2f2fd",
  info: "#178fe2",
  primary: "#7a1f36",
  primarySub: "#8a191d",
  success: "#34c759",
  surface: "#ffffff",
  tableHeader: "#e7e7e7",
  textPrimary: "#202426",
  textSecondary: "#636567",
  warning: "#ff9500",
} as const;

const theme: ThemeConfig = {
  token: {
    colorPrimary: palette.primary,
    colorLink: palette.primary,
    colorInfo: palette.primary,
    colorSuccess: palette.success,
    colorWarning: palette.warning,
    colorError: palette.error,
    colorText: palette.textPrimary,
    colorTextBase: palette.textPrimary,
    colorTextSecondary: palette.textSecondary,
    colorBgBase: palette.surface,
    colorBgContainer: palette.surface,
    colorBgElevated: palette.surface,
    colorBgLayout: palette.bgPrimary,
    colorBorder: palette.borderSecondary,
    colorBorderSecondary: palette.borderPrimary,
    borderRadius: 6,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
  },
  components: {
    Button: {
      borderRadius: 6,
      colorPrimary: palette.primary,
      colorPrimaryHover: palette.primarySub,
      colorPrimaryActive: palette.primarySub,
    },
    Dropdown: {
      colorBgElevated: palette.surface,
      paddingBlock: 4,
      zIndexPopup: 1050,
    },
    Input: {
      activeBorderColor: palette.primary,
      hoverBorderColor: palette.primary,
    },
    Layout: {
      bodyBg: palette.bgPrimary,
      headerBg: palette.surface,
      siderBg: palette.surface,
    },
    Menu: {
      itemSelectedBg: palette.goldSoft,
      itemSelectedColor: palette.primary,
      itemHoverColor: palette.primary,
      popupBg: palette.surface,
    },
    Modal: {
      borderRadiusLG: 10,
    },
    Select: {
      optionSelectedBg: palette.goldSoft,
    },
    Table: {
      borderRadius: 8,
      headerBg: palette.tableHeader,
      rowHoverBg: palette.hoverPrimary,
    },
    Tabs: {
      itemSelectedColor: palette.primary,
      itemHoverColor: palette.primarySub,
    },
  },
};

const antdDefaultConfig: ConfigProviderProps = {
  locale: viVN,
  theme,
};

export default antdDefaultConfig;
