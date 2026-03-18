import React from "react";
import { Bell, Search, UserCircle } from "lucide-react";

export const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center flex-1">
        <div className="relative w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="搜索..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="h-8 w-px bg-slate-200"></div>
        <button className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
          <UserCircle className="w-8 h-8 text-slate-400" />
          <span>管理员</span>
        </button>
      </div>
    </header>
  );
};
