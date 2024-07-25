import { useMutation } from '@apollo/client';
import { useApolloClient } from '@apollo/client';

import { SIGN_IN } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

export const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password}) => {
    const { data } = await mutate({ variables: { username, password }})
    authStorage.setAccessToken(data.authenticate.accessToken)
    apolloClient.resetStore();
    return { data, result };
  }
  return [signIn, result]
}