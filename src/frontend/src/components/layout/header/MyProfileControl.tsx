import { User, LogOut } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useProfileCompletion } from '../../../hooks/profile/useProfileCompletion';
import { useInternetIdentity } from '../../../hooks/useInternetIdentity';

interface MyProfileControlProps {
  onNavigate?: () => void;
  onLogout?: () => void;
  variant?: 'desktop' | 'mobile';
}

export default function MyProfileControl({ onNavigate, onLogout, variant = 'desktop' }: MyProfileControlProps) {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: completionPercentage, isLoading: completionLoading } = useProfileCompletion();

  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return null;
  }

  const handleViewProfile = () => {
    navigate({ to: '/profile' });
    onNavigate?.();
  };

  const handleLogout = () => {
    onLogout?.();
    onNavigate?.();
  };

  if (variant === 'mobile') {
    return (
      <div className="flex flex-col">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="justify-start">
              <User className="h-4 w-4 mr-2" />
              My Profile
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem onClick={handleViewProfile}>
              <User className="h-4 w-4 mr-2" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {!completionLoading && completionPercentage !== undefined && (
          <span className="text-xs text-muted-foreground ml-4">
            {completionPercentage}% complete
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 h-auto py-1"
          >
            <User className="h-4 w-4" />
            My Profile
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleViewProfile}>
            <User className="h-4 w-4 mr-2" />
            View Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {!completionLoading && completionPercentage !== undefined && (
        <span className="text-xs text-muted-foreground -mt-1">
          {completionPercentage}% complete
        </span>
      )}
    </div>
  );
}
