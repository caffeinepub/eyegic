import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';
import { RepairType, PriceInfo } from '../../backend';

interface CreateRepairBookingParams {
  repairTypes?: RepairType[];
  details?: string;
  address?: string;
  preferredTime?: string;
  price: PriceInfo;
}

export function useCreateRepairBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: CreateRepairBookingParams) => {
      if (!actor) throw new Error('Actor not initialized');

      const bookingId = await actor.createRepairBooking(
        params.repairTypes || [],
        params.details || null,
        params.address || null,
        params.preferredTime || null,
        params.price
      );

      return bookingId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customerBookings'] });
      queryClient.invalidateQueries({ queryKey: ['allBookings'] });
    },
  });
}
