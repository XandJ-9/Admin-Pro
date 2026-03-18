import { ActivityLog } from "../types";
import { mockGetActivityLogs } from "../mock/activityMock";

const USE_MOCK = true;

export const getActivityLogs = async (userId?: string): Promise<ActivityLog[]> => {
  if (USE_MOCK) {
    return mockGetActivityLogs(userId);
  }
  // 实际 API 调用
  const response = await fetch(`/api/activity-logs${userId ? `?userId=${userId}` : ""}`);
  if (!response.ok) {
    throw new Error("Failed to fetch activity logs");
  }
  return response.json();
};
