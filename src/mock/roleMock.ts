import { Role } from "../types";

let roles: Role[] = [
  { id: "1", name: "管理员", description: "系统最高权限", permissions: ["all"], createdAt: "2026-01-01" },
  { id: "2", name: "编辑", description: "内容编辑权限", permissions: ["read", "write"], createdAt: "2026-02-15" },
  { id: "3", name: "访客", description: "仅查看权限", permissions: ["read"], createdAt: "2026-03-10" },
];

export const mockGetRoles = async (): Promise<Role[]> => {
  return new Promise((resolve) => setTimeout(() => resolve([...roles]), 500));
};

export const mockAddRole = async (role: Omit<Role, "id" | "createdAt">): Promise<Role> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newRole: Role = {
        ...role,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString().split("T")[0],
      };
      roles.push(newRole);
      resolve(newRole);
    }, 500);
  });
};

export const mockDeleteRole = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      roles = roles.filter((r) => r.id !== id);
      resolve();
    }, 500);
  });
};

export const mockUpdateRole = async (id: string, role: Partial<Role>): Promise<Role> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = roles.findIndex((r) => r.id === id);
      if (index !== -1) {
        roles[index] = { ...roles[index], ...role };
        resolve(roles[index]);
      }
    }, 500);
  });
};
