import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';
import { PriceInfo } from '../../backend';

interface CreateRentalBookingParams {
  itemId: bigint;
  rentalPeriod: bigint;
  address: string;
  price: PriceInfo;
}

export function useCreateRentalBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: CreateRentalBookingParams) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createRentalBooking(
        params.itemId,
        params.rentalPeriod,
        params.address,
        params.price
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customerBookings'] });
    },
  });
}
