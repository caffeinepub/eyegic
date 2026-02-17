import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';
import { ExternalBlob } from '../../backend';

export function useUpdateProfilePicture() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (picture: ExternalBlob) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateProfilePicture(picture);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      queryClient.invalidateQueries({ queryKey: ['profileCompletion'] });
    },
  });
}

export function useUpdatePrescriptionPicture() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (picture: ExternalBlob) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updatePrescriptionPicture(picture);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      queryClient.invalidateQueries({ queryKey: ['profileCompletion'] });
    },
  });
}
