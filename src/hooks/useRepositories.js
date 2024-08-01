import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (listOrder, keyword) => {
  console.log(keyword)

  let orderByValue = 'CREATED_AT';
  let orderDirection = 'DESC'
  if (listOrder === 'lowest') {
    orderDirection = 'ASC'
  }
  if (listOrder === 'highest') {
    orderDirection = 'DESC'
  }
  if (listOrder === 'highest' || listOrder === 'lowest') {
    orderByValue = "RATING_AVERAGE";
  }
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy: orderByValue,
      orderDirection: orderDirection,
      searchKeyword: keyword,
    }
  });

  if(error) {
    console.error(error)
  }

  else if(loading) {
    return loading
  }

  else {
    return data
  }
}

export default useRepositories;