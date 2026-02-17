import { Bell } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { useMobileNumberVerifications } from '../../../hooks/admin/useMobileNumberVerifications';

interface AdminNotificationsControlProps {
  onNavigate?: () => void;
}

export default function AdminNotificationsControl({ onNavigate }: AdminNotificationsControlProps) {
  const navigate = useNavigate();
  const { data: verifications } = useMobileNumberVerifications(true);

  const notificationCount = verifications?.length || 0;

  const handleClick = () => {
    navigate({ to: '/admin/notifications' });
    onNavigate?.();
  };

  return (
    <Button variant="ghost" size="icon" className="relative" onClick={handleClick}>
      <Bell className="h-5 w-5" />
      {notificationCount > 0 && (
        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-medium">
          {notificationCount}
        </span>
      )}
    </Button>
  );
}
