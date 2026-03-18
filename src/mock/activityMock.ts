import { ActivityLog } from "../types";

const activityLogs: ActivityLog[] = [
  { id: "1", userId: "1", action: "登录系统", module: "认证", timestamp: "2026-03-17 08:30:00" },
  { id: "2", userId: "1", action: "修改用户信息", module: "用户管理", timestamp: "2026-03-17 09:15:22", details: "修改了用户 editor 的状态" },
  { id: "3", userId: "2", action: "登录系统", module: "认证", timestamp: "2026-03-17 10:00:00" },
  { id: "4", userId: "2", action: "发布文章", module: "内容管理", timestamp: "2026-03-17 10:45:10", details: "发布了新文章《React 性能优化指南》" },
  { id: "5", userId: "1", action: "删除角色", module: "角色管理", timestamp: "2026-03-17 11:20:05", details: "删除了角色 '临时工'" },
  { id: "6", userId: "3", action: "登录系统", module: "认证", timestamp: "2026-03-17 12:10:00" },
  { id: "7", userId: "1", action: "导出报表", module: "统计分析", timestamp: "2026-03-17 13:05:30" },
  { id: "8", userId: "4", action: "登录系统", module: "认证", timestamp: "2026-03-17 14:00:00" },
  { id: "9", userId: "4", action: "修改个人资料", module: "个人中心", timestamp: "2026-03-17 14:30:00" },
  { id: "10", userId: "5", action: "登录系统", module: "认证", timestamp: "2026-03-17 15:00:00" },
];

export const mockGetActivityLogs = async (userId?: string): Promise<ActivityLog[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (userId) {
        resolve(activityLogs.filter(log => log.userId === userId).sort((a, b) => b.timestamp.localeCompare(a.timestamp)));
      } else {
        resolve([...activityLogs].sort((a, b) => b.timestamp.localeCompare(a.timestamp)));
      }
    }, 500);
  });
};
