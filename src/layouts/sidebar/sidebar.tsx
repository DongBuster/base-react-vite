// import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
// import type { MenuProps } from "antd";
// import { Menu } from "antd";
// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useMenuItems } from "../../services/menuSidebar";
// import "./sidebar.css";

// interface LevelKeysProps {
//   key?: string;
//   children?: LevelKeysProps[];
// }
// export function isSmallDevice(): boolean {
//   const width = window.innerWidth;
//   return width < 1280; // <1280 = tablet hoặc mobile, đều đóng sidebar
// }
// const getLevelKeys = (items1: LevelKeysProps[]) => {
//   const key: Record<string, number> = {};
//   const func = (items2: LevelKeysProps[], level = 1) => {
//     items2.forEach((item) => {
//       if (item.key) {
//         key[item.key] = level;
//       }
//       if (item.children) {
//         func(item.children, level + 1);
//       }
//     });
//   };
//   func(items1);
//   return key;
// };

// const Sidebar: React.FC = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const itemsMenuSidebar = useMenuItems();
//   const levelKeys = getLevelKeys(itemsMenuSidebar as LevelKeysProps[]);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const [stateOpenKeys, setStateOpenKeys] = useState<string[]>([]);

//   // Auto collapse khi màn nhỏ
//   useEffect(() => {
//     const handleResize = () => {
//       const small = isSmallDevice();
//       setCollapsed(small);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Mở submenu tương ứng với route
//   useEffect(() => {
//     const path = location.pathname;
//     const keys: string[] = [];

//     Object.keys(levelKeys).forEach((k) => {
//       if (path.startsWith(k)) {
//         keys.push(k);
//       }
//     });

//     setStateOpenKeys(keys);
//   }, [location.pathname]);

//   const toggleCollapsed = () => {
//     setCollapsed(!collapsed);
//   };

//   // Custom mở menu theo level
//   const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
//     const currentOpenKey = openKeys.find(
//       (key) => stateOpenKeys.indexOf(key) === -1
//     );

//     if (currentOpenKey !== undefined) {
//       const repeatIndex = openKeys
//         .filter((key) => key !== currentOpenKey)
//         .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

//       setStateOpenKeys(
//         openKeys
//           .filter((_, index) => index !== repeatIndex)
//           .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
//       );
//     } else {
//       setStateOpenKeys(openKeys);
//     }
//   };

//   return (
//     <div
//       className={`wrapper  ${collapsed ? "Collapsed" : ""} `}
//       style={{ position: "sticky", height: "calc(100vh - 56px)" }}
//     >
//       <div className="shadow-md ">
//         <Menu
//           mode="inline"
//           selectedKeys={[location.pathname]}
//           openKeys={!collapsed ? stateOpenKeys : undefined} // ✔ chỉ apply khi sidebar đang mở
//           onOpenChange={!collapsed ? onOpenChange : undefined} // ✔ không chạy logic mở/đóng khi collapsed
//           inlineCollapsed={collapsed}
//           items={itemsMenuSidebar}
//           onClick={(e) => navigate(e.key)}
//         />

//         <div
//           className="icon-collapsed flex justify-center bg-white"
//           onClick={toggleCollapsed}
//         >
//           {collapsed ? (
//             <MenuUnfoldOutlined style={{ fontSize: 18 }} />
//           ) : (
//             <MenuFoldOutlined style={{ fontSize: 18 }} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
