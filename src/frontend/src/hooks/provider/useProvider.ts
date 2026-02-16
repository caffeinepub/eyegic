import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';
import { useInternetIdentity } from '../useInternetIdentity';
import { Provider, ServiceType } from '../../backend';

export function useProvider() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<Provider | null>({
    queryKey: ['provider', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return null;
      return actor.getProvider(identity.getPrincipal());
    },
    enabled: !!actor && !!identity && !isFetching,
  });
}

interface OnboardProviderParams {
  name: string;
  contact: string;
  serviceAreas: string;
  services: ServiceType[];
  availability: string;
}

export function useOnboardProvider() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: OnboardProviderParams) => {
      if (!actor) throw new Error('Actor not available');
      return actor.onboardProvider(
        params.name,
        params.contact,
        params.serviceAreas,
        params.services,
        params.availability
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provider'] });
    },
  });
}
