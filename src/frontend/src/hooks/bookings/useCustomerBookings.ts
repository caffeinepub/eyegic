import { useQuery } from '@tanstack/react-query';
import { useActor } from '../useActor';
import { Booking } from '../../backend';

export function useCustomerBookings() {
  const { actor, isFetching } = useActor();

  return useQuery<Booking[]>({
    queryKey: ['customerBookings'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCustomerBookings();
    },
    enabled: !!actor && !isFetching,
  });
}
