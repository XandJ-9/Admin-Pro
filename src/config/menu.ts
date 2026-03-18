import { Users, Shield, Settings, LayoutDashboard } from "lucide-react";

export interface MenuItem {
  title: string;
  path: string;
  icon?: any;
  children?: MenuItem[];
}

export const menuConfig: MenuItem[] = [
  {
    title: "仪表盘",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "系统管理",
    path: "/system",
    icon: Settings,
    children: [
      {
        title: "用户管理",
        path: "/system/user",
        icon: Users,
      },
      {
        title: "角色管理",
        path: "/system/role",
        icon: Shield,
      },
    ],
  },
];
