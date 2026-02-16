import { useQuery } from '@tanstack/react-query';
import { useActor } from '../useActor';
import { Booking } from '../../backend';

export function useProviderBookings() {
  const { actor, isFetching } = useActor();

  return useQuery<Booking[]>({
    queryKey: ['providerBookings'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getProviderBookings();
    },
    enabled: !!actor && !isFetching,
  });
}
