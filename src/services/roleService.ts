import { Role } from "../types";
import { mockGetRoles, mockAddRole, mockDeleteRole, mockUpdateRole } from "../mock/roleMock";

const USE_MOCK = true;

export const getRoles = async (): Promise<Role[]> => {
  if (USE_MOCK) {
    return mockGetRoles();
  }
  const response = await fetch("/api/roles");
  return response.json();
};

export const addRole = async (role: Omit<Role, "id" | "createdAt">): Promise<Role> => {
  if (USE_MOCK) {
    return mockAddRole(role);
  }
  const response = await fetch("/api/roles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(role),
  });
  return response.json();
};

export const updateRole = async (id: string, role: Partial<Role>): Promise<Role> => {
  if (USE_MOCK) {
    return mockUpdateRole(id, role);
  }
  const response = await fetch(`/api/roles/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(role),
  });
  return response.json();
};

export const deleteRole = async (id: string): Promise<void> => {
  if (USE_MOCK) {
    return mockDeleteRole(id);
  }
  await fetch(`/api/roles/${id}`, { method: "DELETE" });
};
