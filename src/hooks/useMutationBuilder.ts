import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { postData } from '../lib/api';

export const useMutationBuilder = <T, R>(
  url: string,
  options?: UseMutationOptions<R, Error, T>,
) => {
  return useMutation<R, Error, T>({
    mutationFn: (body) => postData<T, R>(url, body),
    ...options,
  });
};
