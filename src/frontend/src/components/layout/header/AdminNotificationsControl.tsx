import { Bell } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMobileNumberVerifications } from '../../../hooks/admin/useMobileNumberVerifications';
import { useIsCallerAdmin } from '../../../hooks/auth/useIsCallerAdmin';

interface AdminNotificationsControlProps {
  onNavigate?: () => void;
}

export default function AdminNotificationsControl({ onNavigate }: AdminNotificationsControlProps) {
  const navigate = useNavigate();
  const { data: isAdmin } = useIsCallerAdmin();
  const { data: verifications } = useMobileNumberVerifications(isAdmin === true);

  const notificationCount = verifications?.length || 0;

  const handleNotificationsClick = () => {
    navigate({ to: '/admin/notifications' });
    onNavigate?.();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          Admin
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleNotificationsClick} className="flex items-center gap-2">
          <div className="relative">
            <Bell className="h-4 w-4" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center font-medium">
                {notificationCount}
              </span>
            )}
          </div>
          Notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
