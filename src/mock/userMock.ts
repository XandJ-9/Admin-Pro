import { User } from "../types";

let users: User[] = [
  { id: "1", username: "admin", email: "admin@example.com", role: "管理员", status: "active", createdAt: "2026-01-01" },
  { id: "2", username: "editor", email: "editor@example.com", role: "编辑", status: "active", createdAt: "2026-02-15" },
  { id: "3", username: "viewer", email: "viewer@example.com", role: "访客", status: "inactive", createdAt: "2026-03-10" },
  { id: "4", username: "alice", email: "alice@example.com", role: "编辑", status: "active", createdAt: "2026-03-11" },
  { id: "5", username: "bob", email: "bob@example.com", role: "访客", status: "active", createdAt: "2026-03-12" },
  { id: "6", username: "charlie", email: "charlie@example.com", role: "访客", status: "inactive", createdAt: "2026-03-13" },
  { id: "7", username: "dave", email: "dave@example.com", role: "编辑", status: "active", createdAt: "2026-03-14" },
  { id: "8", username: "eve", email: "eve@example.com", role: "访客", status: "active", createdAt: "2026-03-15" },
  { id: "9", username: "frank", email: "frank@example.com", role: "访客", status: "inactive", createdAt: "2026-03-16" },
  { id: "10", username: "grace", email: "grace@example.com", role: "编辑", status: "active", createdAt: "2026-03-17" },
  { id: "11", username: "heidi", email: "heidi@example.com", role: "管理员", status: "active", createdAt: "2026-03-17" },
  { id: "12", username: "ivan", email: "ivan@example.com", role: "访客", status: "active", createdAt: "2026-03-17" },
];

export const mockGetUsers = async (): Promise<User[]> => {
  return new Promise((resolve) => setTimeout(() => resolve([...users]), 500));
};

export const mockAddUser = async (user: Omit<User, "id" | "createdAt">): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser: User = {
        ...user,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString().split("T")[0],
      };
      users.push(newUser);
      resolve(newUser);
    }, 500);
  });
};

export const mockDeleteUser = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      users = users.filter((u) => u.id !== id);
      resolve();
    }, 500);
  });
};

export const mockUpdateUser = async (id: string, user: Partial<User>): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = users.findIndex((u) => u.id === id);
      if (index !== -1) {
        users[index] = { ...users[index], ...user };
        resolve(users[index]);
      }
    }, 500);
  });
};
