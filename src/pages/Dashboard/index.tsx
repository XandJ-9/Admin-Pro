import React from "react";
import * as Antd from "antd";
import {
  UserOutlined,
  SafetyOutlined,
  LineChartOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

const { Title, Text } = Antd.Typography;
const AntCard = Antd.Card as any;

export const Dashboard = () => {
  const stats = [
    { title: "总用户数", value: 1234, icon: <UserOutlined />, color: "#1890ff" },
    { title: "系统角色", value: 12, icon: <SafetyOutlined />, color: "#722ed1" },
    { title: "活跃会话", value: 423, icon: <ThunderboltOutlined />, color: "#52c41a" },
    { title: "系统负载", value: "24%", icon: <LineChartOutlined />, color: "#f5222d" },
  ];

  return (
    <div>
      <div className="mb-6">
        <Antd.Breadcrumb items={[{ title: '首页' }, { title: '仪表盘' }]} className="mb-2" />
        <Title level={2} style={{ margin: 0 }}>仪表盘</Title>
        <Text type="secondary">欢迎回来，这里是系统概览。</Text>
      </div>

      <Antd.Row gutter={[24, 24]}>
        {stats.map((stat, index) => (
          <Antd.Col xs={24} sm={12} lg={6} key={index}>
            <AntCard variant="borderless" className="shadow-sm hover:shadow-md transition-shadow">
              <Antd.Statistic
                title={<Text type="secondary">{stat.title}</Text>}
                value={stat.value}
                prefix={<span style={{ color: stat.color, marginRight: 8 }}>{stat.icon}</span>}
                styles={{ content: { fontWeight: 'bold' } }}
              />
            </AntCard>
          </Antd.Col>
        ))}
      </Antd.Row>

      <Antd.Row gutter={[24, 24]} className="mt-6">
        <Antd.Col span={24}>
          <AntCard 
            title="系统活跃度" 
            variant="borderless" 
            className="shadow-sm"
            style={{ minHeight: 400 }}
          >
            <div className="flex items-center justify-center h-64">
              <Text type="secondary">图表区域占位</Text>
            </div>
          </AntCard>
        </Antd.Col>
      </Antd.Row>
    </div>
  );
};
