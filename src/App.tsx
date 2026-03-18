import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./components/Layout/MainLayout";
import { Dashboard } from "./pages/Dashboard";
import { UserManagement } from "./pages/System/User";
import { RoleManagement } from "./pages/System/Role";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="system">
            <Route index element={<Navigate to="/system/user" replace />} />
            <Route path="user" element={<UserManagement />} />
            <Route path="role" element={<RoleManagement />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
