import { Outlet } from "react-router-dom";
import Header from "./header/header";

export default function MainLayout() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <Header />

      <div
        className="flex w-full flex-1 overflow-hidden"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <div className="w-full min-h-0 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
