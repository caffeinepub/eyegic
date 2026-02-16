import { useQuery } from '@tanstack/react-query';
import { useActor } from '../useActor';
import { Booking } from '../../backend';

export function useBooking(bookingId: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<Booking>({
    queryKey: ['booking', bookingId.toString()],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getBooking(bookingId);
    },
    enabled: !!actor && !isFetching,
  });
}
