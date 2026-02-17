import { User } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { useProfileCompletion } from '../../../hooks/profile/useProfileCompletion';
import { useInternetIdentity } from '../../../hooks/useInternetIdentity';

interface MyProfileControlProps {
  onNavigate?: () => void;
  variant?: 'desktop' | 'mobile';
}

export default function MyProfileControl({ onNavigate, variant = 'desktop' }: MyProfileControlProps) {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: completionPercentage } = useProfileCompletion();

  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return null;
  }

  const handleNavigate = () => {
    navigate({ to: '/profile' });
    onNavigate?.();
  };

  if (variant === 'mobile') {
    return (
      <div className="flex flex-col">
        <Button variant="ghost" className="justify-start" onClick={handleNavigate}>
          <User className="h-4 w-4 mr-2" />
          My Profile
        </Button>
        {completionPercentage !== undefined && (
          <span className="text-xs text-muted-foreground ml-4">
            {completionPercentage}% complete
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleNavigate}
        className="flex items-center gap-2 h-auto py-1"
      >
        <User className="h-4 w-4" />
        My Profile
      </Button>
      {completionPercentage !== undefined && (
        <span className="text-xs text-muted-foreground -mt-1">
          {completionPercentage}% complete
        </span>
      )}
    </div>
  );
}
