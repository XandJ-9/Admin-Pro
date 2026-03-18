import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { menuConfig, MenuItem } from "../../config/menu";
import { ChevronDown, ChevronRight, ChevronLeft, Menu } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SidebarItem: React.FC<{ item: MenuItem; depth?: number; isCollapsed: boolean }> = ({ item, depth = 0, isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const hasChildren = item.children && item.children.length > 0;
  
  const isActive = location.pathname === item.path || (hasChildren && item.children?.some(child => location.pathname.startsWith(child.path)));

  if (hasChildren) {
    return (
      <div className="mb-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
            isActive ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
            isCollapsed && "justify-center px-0"
          )}
          style={{ paddingLeft: isCollapsed ? undefined : `${depth * 1 + 1}rem` }}
          title={isCollapsed ? item.title : undefined}
        >
          <div className="flex items-center gap-3">
            {item.icon && <item.icon className="w-5 h-5 flex-shrink-0" />}
            {!isCollapsed && <span className="whitespace-nowrap">{item.title}</span>}
          </div>
          {!isCollapsed && (isOpen ? <ChevronDown className="w-4 h-4 flex-shrink-0" /> : <ChevronRight className="w-4 h-4 flex-shrink-0" />)}
        </button>
        {isOpen && !isCollapsed && (
          <div className="mt-1 space-y-1">
            {item.children!.map((child) => (
              <SidebarItem key={child.path} item={child} depth={depth + 1} isCollapsed={isCollapsed} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors mb-1",
          isActive
            ? "bg-indigo-50 text-indigo-700"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
          isCollapsed && "justify-center px-0"
        )
      }
      style={{ paddingLeft: isCollapsed ? undefined : `${depth * 1 + 1}rem` }}
      title={isCollapsed ? item.title : undefined}
    >
      {item.icon && <item.icon className="w-5 h-5 flex-shrink-0" />}
      {!isCollapsed && <span className="whitespace-nowrap">{item.title}</span>}
    </NavLink>
  );
};

export const Sidebar = ({ isCollapsed, toggleCollapse }: { isCollapsed: boolean; toggleCollapse: () => void }) => {
  return (
    <aside className={cn(
      "bg-white border-r border-slate-200 h-screen flex flex-col fixed left-0 top-0 z-20 transition-all duration-300",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="h-16 flex items-center justify-center border-b border-slate-200 px-4">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-xl">A</span>
        </div>
        {!isCollapsed && <h1 className="text-lg font-bold text-slate-900 ml-3 whitespace-nowrap overflow-hidden">Admin Pro</h1>}
      </div>
      <div className="flex-1 overflow-y-auto py-4 px-3 overflow-x-hidden">
        {menuConfig.map((item) => (
          <SidebarItem key={item.path} item={item} isCollapsed={isCollapsed} />
        ))}
      </div>
    </aside>
  );
};
