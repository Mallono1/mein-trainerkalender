import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { postData } from '../lib/api';

interface RegisterUserRequest {
  firstName: string;
  lastName: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  phoneNumber: string;
  email: string;
  repeatEmail: string;
  password: string;
  repeatPassword: string;
}

interface RegisterUserResponse {
  success: boolean;
}

export const useRegisterUser = (
  options?: UseMutationOptions<
    RegisterUserResponse,
    Error,
    RegisterUserRequest
  >,
) => {
  return useMutation<RegisterUserResponse, Error, RegisterUserRequest>({
    mutationFn: (body) =>
      postData<RegisterUserRequest, RegisterUserResponse>(
        '/user/register',
        body,
      ),
    ...options,
  });
};
