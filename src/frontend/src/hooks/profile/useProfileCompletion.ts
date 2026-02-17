import { useQuery } from '@tanstack/react-query';
import { useActor } from '../useActor';

export function useProfileCompletion() {
  const { actor, isFetching } = useActor();

  return useQuery<number>({
    queryKey: ['profileCompletion'],
    queryFn: async () => {
      if (!actor) return 0;
      const completion = await actor.calculateProfileCompletion();
      // Ensure we return a stable whole number between 0-100
      const normalized = Number(completion);
      return Math.max(0, Math.min(100, Math.round(normalized)));
    },
    enabled: !!actor && !isFetching,
  });
}
