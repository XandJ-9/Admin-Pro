import React, { useEffect, useState } from "react";
import { 
  Table, 
  Button, 
  Input, 
  Select, 
  Modal, 
  Form, 
  Tag, 
  Space, 
  Card, 
  Typography, 
  Popconfirm, 
  message,
  Breadcrumb
} from "antd";
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined, 
  DeleteOutlined,
  UserOutlined
} from "@ant-design/icons";
import { User } from "../../../types";
import { getUsers, deleteUser, addUser, updateUser } from "../../../services/userService";

const { Title, Text } = Typography;

const AntCard = Card as any;

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      message.error("获取用户列表失败");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      message.success("删除成功");
      fetchUsers();
    } catch (error) {
      message.error("删除失败");
    }
  };

  const handleOpenModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      form.setFieldsValue({
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else {
      setEditingUser(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        await updateUser(editingUser.id, values);
        message.success("更新成功");
      } else {
        await addUser(values);
        message.success("新增成功");
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const columns = [
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "角色",
      dataIndex: "role",
      key: "role",
      render: (role: string) => {
        let color = "blue";
        if (role === "管理员") color = "gold";
        if (role === "编辑") color = "cyan";
        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "success" : "default"}>
          {status === "active" ? "正常" : "禁用"}
        </Tag>
      ),
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "操作",
      key: "action",
      align: "right" as const,
      render: (_: any, record: User) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleOpenModal(record)}
            className="text-indigo-600 hover:text-indigo-800"
          />
          <Popconfirm
            title="确定要删除该用户吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />} 
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-0">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Breadcrumb items={[{ title: '首页' }, { title: '系统管理' }, { title: '用户管理' }]} className="mb-2" />
          <Title level={2} style={{ margin: 0 }}>用户管理</Title>
          <Text type="secondary">管理系统用户及其状态。</Text>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => handleOpenModal()}
          size="large"
          className="bg-indigo-600"
        >
          新增用户
        </Button>
      </div>

      <AntCard className="shadow-sm border-slate-100">
        <div className="mb-4 flex flex-wrap gap-4 items-center">
          <Input
            placeholder="搜索用户名或邮箱..."
            prefix={<SearchOutlined className="text-slate-400" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: 280 }}
            allowClear
          />
          <Select
            value={roleFilter}
            onChange={setRoleFilter}
            style={{ width: 120 }}
            options={[
              { value: "all", label: "所有角色" },
              { value: "管理员", label: "管理员" },
              { value: "编辑", label: "编辑" },
              { value: "访客", label: "访客" },
            ]}
          />
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 120 }}
            options={[
              { value: "all", label: "所有状态" },
              { value: "active", label: "正常" },
              { value: "inactive", label: "禁用" },
            ]}
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          loading={loading}
          scroll={{ x: 800 }}
          pagination={{
            pageSize: 10,
            showTotal: (total) => `共 ${total} 条数据`,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          className="ant-table-custom"
        />
      </AntCard>

      <Modal
        title={editingUser ? "编辑用户" : "新增用户"}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
        okText="确定"
        cancelText="取消"
        destroyOnHidden
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ role: "访客", status: "active" }}
          className="mt-4"
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: "请输入邮箱" },
              { type: "email", message: "请输入有效的邮箱地址" }
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true, message: "请选择角色" }]}
          >
            <Select 
              placeholder="请选择角色"
              options={[
                { value: "管理员", label: "管理员" },
                { value: "编辑", label: "编辑" },
                { value: "访客", label: "访客" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: "请选择状态" }]}
          >
            <Select 
              placeholder="请选择状态"
              options={[
                { value: "active", label: "正常" },
                { value: "inactive", label: "禁用" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
