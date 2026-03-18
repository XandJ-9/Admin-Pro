import { User } from "../types";
import { mockGetUsers, mockAddUser, mockDeleteUser, mockUpdateUser } from "../mock/userMock";

// Set to false to use real API
const USE_MOCK = true;

export const getUsers = async (): Promise<User[]> => {
  if (USE_MOCK) {
    return mockGetUsers();
  }
  // Real API call here
  const response = await fetch("/api/users");
  return response.json();
};

export const addUser = async (user: Omit<User, "id" | "createdAt">): Promise<User> => {
  if (USE_MOCK) {
    return mockAddUser(user);
  }
  // Real API call here
  const response = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const updateUser = async (id: string, user: Partial<User>): Promise<User> => {
  if (USE_MOCK) {
    return mockUpdateUser(id, user);
  }
  const response = await fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const deleteUser = async (id: string): Promise<void> => {
  if (USE_MOCK) {
    return mockDeleteUser(id);
  }
  // Real API call here
  await fetch(`/api/users/${id}`, { method: "DELETE" });
};
