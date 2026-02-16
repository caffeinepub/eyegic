import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';
import { BookingStatus } from '../../backend';

interface UpdateBookingStatusParams {
  bookingId: bigint;
  newStatus: BookingStatus;
}

export function useUpdateBookingStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: UpdateBookingStatusParams) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateBookingStatus(params.bookingId, params.newStatus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['providerBookings'] });
      queryClient.invalidateQueries({ queryKey: ['customerBookings'] });
      queryClient.invalidateQueries({ queryKey: ['booking'] });
    },
  });
}
