import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';
import { RepairType, PriceInfo } from '../../backend';

interface CreateRepairBookingParams {
  repairType?: RepairType;
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
      if (!actor) throw new Error('Actor not available');
      return actor.createRepairBooking(
        params.repairType || RepairType.other,
        params.details || null,
        params.address || null,
        params.preferredTime || null,
        params.price
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customerBookings'] });
    },
  });
}
