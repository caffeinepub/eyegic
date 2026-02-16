import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';
import { ServiceType, PriceInfo } from '../../backend';

interface CreateOpticianBookingParams {
  serviceType: ServiceType;
  details: string;
  address: string;
  preferredTime: string;
  price: PriceInfo;
}

export function useCreateOpticianBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: CreateOpticianBookingParams) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createOpticianBooking(
        params.serviceType,
        params.details,
        params.address,
        params.preferredTime,
        params.price
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customerBookings'] });
    },
  });
}
