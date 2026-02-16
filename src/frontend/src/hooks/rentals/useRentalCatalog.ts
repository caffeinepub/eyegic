import { useQuery } from '@tanstack/react-query';
import { useActor } from '../useActor';
import { RentalItem } from '../../backend';

export function useRentalCatalog() {
  const { actor, isFetching } = useActor();

  return useQuery<RentalItem[]>({
    queryKey: ['rentalCatalog'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getRentalCatalog();
    },
    enabled: !!actor && !isFetching,
  });
}
