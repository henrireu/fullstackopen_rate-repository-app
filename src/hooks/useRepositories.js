import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (listOrder, keyword) => {

  let orderByValue = 'CREATED_AT';
  let orderDirection = 'DESC';

  if (listOrder === 'lowest') {
    orderDirection = 'ASC';
  }
  if (listOrder === 'highest' || listOrder === 'lowest') {
    orderByValue = 'RATING_AVERAGE';
  }

  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy: orderByValue,
      orderDirection: orderDirection,
      //searchKeyword: keyword,
      first: 3, 
    },
  });

  const handleFetchMore = () => {
    if (!loading && data?.repositories.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          after: data.repositories.pageInfo.endCursor,
          orderBy: orderByValue,
          orderDirection: orderDirection,
          searchKeyword: keyword,
          first: 3,
        },
      });
    }
  };

  return {
    repositories: data?.repositories.edges || [],
    loading,
    error,
    fetchMore: handleFetchMore,
  };
};

export default useRepositories;