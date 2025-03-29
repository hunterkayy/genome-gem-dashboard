
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Dna,
  LayoutDashboard,
  Upload,
  Database,
  Settings,
  FileText,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Upload', path: '/upload', icon: <Upload size={20} /> },
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Summary', path: '/summary', icon: <FileText size={20} /> },
    { name: 'Detailed View', path: '/detailed', icon: <Database size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside
      className={cn(
        "fixed h-full bg-sidebar border-r border-sidebar-border transition-all z-20",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo and App Title */}
        <div className="flex items-center py-6 px-4 border-b border-sidebar-border">
          <Dna className="text-genomics-blue h-8 w-8" />
          {!collapsed && (
            <span className="ml-2 text-lg font-heading font-semibold text-sidebar-foreground">
              GenomicsHub
            </span>
          )}
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 py-6 px-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location.pathname === item.path
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  )}
                >
                  <span className="flex items-center justify-center w-5 h-5 mr-2">
                    {item.icon}
                  </span>
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Collapse Button */}
        <div className="py-4 px-2 border-t border-sidebar-border">
          <Button
            variant="ghost"
            size="sm"
            className="w-full flex items-center justify-center"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={16} /> : (
              <>
                <ChevronLeft size={16} />
                {!collapsed && <span className="ml-2">Collapse</span>}
              </>
            )}
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
