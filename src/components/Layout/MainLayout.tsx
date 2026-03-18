import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, Button, theme, Avatar, Dropdown, Space, Typography, Grid } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;
const { useBreakpoint } = Grid;

export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "仪表盘",
    },
    {
      key: "system",
      icon: <SettingOutlined />,
      label: "系统管理",
      children: [
        {
          key: "/system/user",
          icon: <UserOutlined />,
          label: "用户管理",
        },
        {
          key: "/system/role",
          icon: <SettingOutlined />,
          label: "角色管理",
        },
      ],
    },
  ];

  const userMenuItems = [
    {
      key: "profile",
      label: "个人中心",
      icon: <UserOutlined />,
    },
    {
      key: "logout",
      label: "退出登录",
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider 
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        theme="light" 
        className="shadow-sm border-r border-slate-100"
      >
        <div className="h-16 flex items-center justify-center border-b border-slate-50 mb-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          {!collapsed && <h1 className="text-lg font-bold text-slate-900 ml-3 whitespace-nowrap overflow-hidden">Admin Pro</h1>}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          defaultOpenKeys={["system"]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ borderRight: 0 }}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} className="flex justify-between items-center px-4 shadow-sm z-10">
          <div className="flex items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </div>
          <div className="flex items-center gap-6 pr-4">
            <Button type="text" icon={<BellOutlined />} className="text-slate-500" />
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
              <Space className="cursor-pointer">
                <Avatar icon={<UserOutlined />} className="bg-indigo-100 text-indigo-600" />
                {screens.md && <Text strong className="text-slate-700">管理员</Text>}
              </Space>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: screens.md ? "24px 16px" : "16px 8px",
            padding: screens.md ? 24 : 16,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "initial"
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
