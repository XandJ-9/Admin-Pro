export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  module: string;
  timestamp: string;
  details?: string;
}
