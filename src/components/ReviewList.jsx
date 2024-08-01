import { useQuery } from "@apollo/client";
import { FlatList } from "react-native";

import Text from "./Text";
import ReviewItem from "./ReviewItem";
import { GET_REVIEWS } from "../graphql/queries";

const ReviewList = ({ id }) => {
  const { loading, error, data } = useQuery(GET_REVIEWS, {
    variables: { id: id },
    fetchPolicy: 'cache-and-network',
  });
    
  if (loading) return null;
  if (error) {
    console.error(error);
    return null;
  }
  
  const reviews = data.repository.reviews.edges;

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
    >

    </FlatList>
  )
}

export default ReviewList