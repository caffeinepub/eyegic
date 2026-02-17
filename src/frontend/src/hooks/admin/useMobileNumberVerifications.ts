import { useQuery } from '@tanstack/react-query';
import { useActor } from '../useActor';
import { LogMobileNumberVerification } from '../../backend';

export function useMobileNumberVerifications(enabled: boolean = true) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<LogMobileNumberVerification[]>({
    queryKey: ['mobileNumberVerifications'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getMobileNumberVerifications();
    },
    enabled: !!actor && !actorFetching && enabled,
    retry: false,
  });
}
