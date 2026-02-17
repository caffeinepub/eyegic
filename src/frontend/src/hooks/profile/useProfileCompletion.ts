import { useQuery } from '@tanstack/react-query';
import { useActor } from '../useActor';
import { useInternetIdentity } from '../useInternetIdentity';

export function useProfileCompletion() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<number>({
    queryKey: ['profileCompletion'],
    queryFn: async () => {
      if (!actor) return 0;
      const completion = await actor.calculateProfileCompletion();
      return Math.max(0, Math.min(100, Number(completion)));
    },
    enabled: !!identity && !!actor && !isFetching,
  });
}
