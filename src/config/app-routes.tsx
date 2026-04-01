import { createBrowserRouter } from "react-router-dom";

import Home from "@features/home/home";
import LoginAnimatedPage from "@features/login-animated/LoginAnimatedPage";
import LoginPage from "@features/login/LoginPage";
import PageNotFound from "@features/page-not-found/page-not-found";
import TestDebugPage from "@features/test-debug/TestDebugPage";
import AuthGuard from "@guards/authGuard";
import GuestGuard from "@guards/guestGuard";
import MainLayout from "@layouts/main-layout";
import { HOME_PATH, LOGIN_ANIMATED_PATH } from "@shared/constants/path";

export const router = createBrowserRouter([
  {
    element: <AuthGuard />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: HOME_PATH, element: <Home /> },

          { path: "*", element: <PageNotFound /> },
        ],
      },
    ],
  },
  {
    element: <GuestGuard />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: `/${LOGIN_ANIMATED_PATH}`, element: <LoginAnimatedPage /> },
    ],
  },
  // ⚠️ DEV ONLY - xóa trước khi deploy production
  {
    path: "/test-debug",
    element: <TestDebugPage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
