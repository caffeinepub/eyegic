import { Badge } from '@/components/ui/badge';
import { BookingStatus } from '../../backend';

interface BookingStatusBadgeProps {
  status: BookingStatus;
}

export default function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  const statusConfig = {
    [BookingStatus.pending]: { label: 'Pending', variant: 'secondary' as const },
    [BookingStatus.accepted]: { label: 'Accepted', variant: 'default' as const },
    [BookingStatus.scheduled]: { label: 'Scheduled', variant: 'default' as const },
    [BookingStatus.inProgress]: { label: 'In Progress', variant: 'default' as const },
    [BookingStatus.completed]: { label: 'Completed', variant: 'outline' as const },
    [BookingStatus.cancelled]: { label: 'Cancelled', variant: 'destructive' as const },
  };

  const config = statusConfig[status];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
