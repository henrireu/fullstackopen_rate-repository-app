import { useQuery } from "@apollo/client";
import { FlatList } from "react-native";

import ReviewItem from "./ReviewItem";
import { GET_REVIEWS } from "../graphql/queries";

const ReviewList = ({ id }) => {
  const { loading, error, data, fetchMore } = useQuery(GET_REVIEWS, {
    variables: { 
      id: id,
      first: 4, 
    },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    if (!loading && data?.repository.reviews.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          after: data.repository.reviews.pageInfo.endCursor,
          id: id,
          first: 4,
        },
      });
    }
  }

    
  if (loading) return null;
  if (error) {
    console.error(error);
    return null;
  }

  const doFetchMore = () => {
    if (fetchMore) {
      handleFetchMore();
    }
  }
  
  const reviews = data.repository.reviews.edges;

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      onEndReached={doFetchMore}
      onEndReachedThreshold={0.5}
    >

    </FlatList>
  )
}

export default ReviewList