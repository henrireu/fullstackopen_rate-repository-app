import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';
import { relayStylePagination } from '@apollo/client/utilities';

const httpLink = createHttpLink({
  uri: Constants.expoConfig.extra.apolloUri,
  //uri: 'http://192.168.42.155:4000/graphql'
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: relayStylePagination(),
      },
    },
    Repository: {
      fields: {
        reviews: relayStylePagination(),
      },
    },
  },
});

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    //cache: new InMemoryCache(),
    cache,
  });
};

/*const createApolloClient = () => {
  return new ApolloClient({
    //uri: 'http://192.168.21.155:4000/graphql',
    uri: Constants.expoConfig.extra.apolloUri,
    cache: new InMemoryCache(),
  });
};*/

export default createApolloClient;