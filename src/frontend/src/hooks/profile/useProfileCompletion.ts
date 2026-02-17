import { useQuery } from '@tanstack/react-query';
import { useActor } from '../useActor';

export function useProfileCompletion() {
  const { actor, isFetching } = useActor();

  return useQuery<number>({
    queryKey: ['profileCompletion'],
    queryFn: async () => {
      if (!actor) return 0;
      const completion = await actor.calculateProfileCompletion();
      return Number(completion);
    },
    enabled: !!actor && !isFetching,
  });
}
