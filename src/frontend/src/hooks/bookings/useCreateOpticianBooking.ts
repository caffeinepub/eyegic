import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';
import { ServiceType, PriceInfo } from '../../backend';

interface CreateOpticianBookingParams {
  serviceType?: ServiceType;
  details?: string;
  address?: string;
  preferredTime?: string;
  price: PriceInfo;
  mobileNumber: string;
}

export function useCreateOpticianBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: CreateOpticianBookingParams) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createOpticianBooking(
        params.serviceType || ServiceType.eyeTest,
        params.details || null,
        params.address || null,
        params.preferredTime || null,
        params.price,
        params.mobileNumber
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customerBookings'] });
    },
  });
}
