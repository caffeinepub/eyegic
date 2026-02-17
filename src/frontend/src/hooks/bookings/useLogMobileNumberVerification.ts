import { useMutation } from '@tanstack/react-query';
import { useActor } from '../useActor';

export function useLogMobileNumberVerification() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (mobileNumber: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.logMobileNumberVerification(mobileNumber);
    },
    onError: (error: any) => {
      console.error('Failed to log mobile number verification:', error);
      throw error;
    },
  });
}
