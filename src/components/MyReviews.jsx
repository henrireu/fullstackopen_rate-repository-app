import { View, FlatList } from "react-native";
import Text from "./Text";
import { useQuery } from "@apollo/client";

import { ME } from "../graphql/queries";
import ReviewItem from "./ReviewItem";

const MyReviews = () => {
    const { data, loading, error, refetch } = useQuery(ME, { 
        fetchPolicy: 'cache-and-network',
        variables: { includeReviews: true }
    });
    if (loading) {
        return <></>
    }
    if (error) {
        console.error(error)
    }
    if(data.me.reviews) {
        return (
            <FlatList
              data={data.me.reviews.edges}
              renderItem={({ item }) => <ReviewItem review={item} myreview={true} refetch={refetch}/>}
            >
            </FlatList>
        )
    }
    return (
        <View>
            <Text>My reviews</Text>
        </View>
    )
}

export default MyReviews;