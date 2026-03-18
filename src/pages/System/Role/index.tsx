import React, { useEffect, useState } from "react";
import { 
  Card, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Checkbox, 
  Space, 
  Typography, 
  Popconfirm, 
  message, 
  Tag, 
  Row, 
  Col,
  Breadcrumb
} from "antd";
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  SafetyCertificateOutlined 
} from "@ant-design/icons";
import { Role } from "../../../types";
import { getRoles, deleteRole, addRole, updateRole } from "../../../services/roleService";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const AntCard = Card as any;

export const RoleManagement = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [form] = Form.useForm();

  const availablePermissions = [
    { value: "all", label: "所有权限" },
    { value: "read", label: "读取权限" },
    { value: "write", label: "写入权限" },
    { value: "delete", label: "删除权限" },
  ];

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const data = await getRoles();
      setRoles(data);
    } catch (error) {
      message.error("获取角色列表失败");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteRole(id);
      message.success("删除成功");
      fetchRoles();
    } catch (error) {
      message.error("删除失败");
    }
  };

  const handleOpenModal = (role?: Role) => {
    if (role) {
      setEditingRole(role);
      form.setFieldsValue({
        name: role.name,
        description: role.description,
        permissions: role.permissions,
      });
    } else {
      setEditingRole(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingRole) {
        await updateRole(editingRole.id, values);
        message.success("更新成功");
      } else {
        await addRole(values);
        message.success("新增成功");
      }
      setIsModalOpen(false);
      fetchRoles();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Breadcrumb items={[{ title: '首页' }, { title: '系统管理' }, { title: '角色管理' }]} className="mb-2" />
          <Title level={2} style={{ margin: 0 }}>角色管理</Title>
          <Text type="secondary">管理系统角色及权限分配。</Text>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => handleOpenModal()}
          size="large"
          className="bg-indigo-600"
        >
          新增角色
        </Button>
      </div>

      <Row gutter={[24, 24]}>
        {loading ? (
          <Col span={24} className="py-12 text-center">
            <Text type="secondary">加载中...</Text>
          </Col>
        ) : roles.length === 0 ? (
          <Col span={24} className="py-12 text-center">
            <Text type="secondary">暂无数据</Text>
          </Col>
        ) : (
          roles.map((role) => (
            <Col xs={24} md={12} lg={8} key={role.id}>
              <AntCard 
                hoverable 
                className="shadow-sm border-slate-100 h-full"
                actions={[
                  <EditOutlined key="edit" onClick={() => handleOpenModal(role)} />,
                  <Popconfirm
                    key="delete"
                    title="确定要删除该角色吗？"
                    onConfirm={() => handleDelete(role.id)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <DeleteOutlined className="text-rose-500" />
                  </Popconfirm>
                ]}
              >
                <AntCard.Meta
                  avatar={
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <SafetyCertificateOutlined style={{ fontSize: 20 }} />
                    </div>
                  }
                  title={<Title level={4} style={{ margin: 0 }}>{role.name}</Title>}
                  description={<Text type="secondary" style={{ fontSize: 12 }}>创建于 {role.createdAt}</Text>}
                />
                <div className="mt-4">
                  <Paragraph ellipsis={{ rows: 2 }} className="text-slate-600">
                    {role.description}
                  </Paragraph>
                  <div>
                    <Text strong type="secondary" style={{ fontSize: 11, textTransform: 'uppercase' }}>权限</Text>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {role.permissions.map((perm, idx) => (
                        <Tag key={idx} color="blue">
                          {perm === "all" ? "所有权限" : perm === "read" ? "读取权限" : perm === "write" ? "写入权限" : perm === "delete" ? "删除权限" : perm}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </div>
              </AntCard>
            </Col>
          ))
        )}
      </Row>

      <Modal
        title={editingRole ? "编辑角色" : "新增角色"}
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
          className="mt-4"
        >
          <Form.Item
            name="name"
            label="角色名称"
            rules={[{ required: true, message: "请输入角色名称" }]}
          >
            <Input placeholder="请输入角色名称" />
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
            rules={[{ required: true, message: "请输入描述" }]}
          >
            <TextArea rows={3} placeholder="请输入角色描述" />
          </Form.Item>
          <Form.Item
            name="permissions"
            label="权限分配"
            rules={[{ required: true, message: "请至少选择一个权限" }]}
          >
            <Checkbox.Group options={availablePermissions} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
