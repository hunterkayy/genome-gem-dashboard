
import React from 'react';
import { useLocation } from 'react-router-dom';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/hooks/use-theme';

interface HeaderProps {
  sidebarCollapsed: boolean;
}

const Header: React.FC<HeaderProps> = ({ sidebarCollapsed }) => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  // Helper function to get page title based on current route
  const getPageTitle = (): string => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/upload':
        return 'Upload Genomic Data';
      case '/summary':
        return 'Summary View';
      case '/detailed':
        return 'Detailed SNP View';
      case '/settings':
        return 'Settings';
      default:
        return 'GenomicsHub';
    }
  };

  return (
    <header className={`fixed top-0 right-0 h-16 bg-background border-b border-border z-10 flex items-center px-6 ${sidebarCollapsed ? 'left-16' : 'left-64'} transition-all`}>
      <div className="flex-1">
        <h1 className="text-xl font-heading font-semibold">{getPageTitle()}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              {theme === 'dark' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme('light')}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
