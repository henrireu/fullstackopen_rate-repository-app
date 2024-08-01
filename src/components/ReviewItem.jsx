import { View, StyleSheet, SafeAreaView, Pressable, Alert } from "react-native";
import { format } from 'date-fns';
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client"; 

import theme from "../theme"
import Text from "./Text"
import { DELETE_REVIEW } from "../graphql/mutations";

const ReviewItem = ({ review, myreview, refetch }) => {
  const [deleteReview] = useMutation(DELETE_REVIEW)

  const navigate= useNavigate();
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return format(date, 'dd.MM.yyyy')
  };

  const handleView = () => {
    navigate(`/${review.node.repositoryId}`)
  }

  const handleDelete = () => {
    const id = review.node.id;
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: async () => {
        console.log('OK Pressed')
        try {
          const { data } = await deleteReview({
            variables: {deleteReviewId: id}
          })
          console.log(data);
          refetch();
        } catch (e) {
          console.log(e)  
        }

      }},
    ]);
  }

  return (
    <SafeAreaView style={{margin: 5}}>
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.blueCircle}>
        <Text color="primary" fontWeight="bold" fontSize="subheading">{review.node.rating}</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.column}>
        <Text fontSize="subheading" fontWeight="bold">{review.node.user.username}</Text>
        <Text>{formatDate(review.node.createdAt)}</Text>
        <Text>{review.node.text}</Text>
      </SafeAreaView>
    </SafeAreaView>
    {myreview && (
      <View style={styles.row}>
        <Pressable 
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={handleView}
        >
          <Text fontWeight="bold" color="white">View repository</Text>
        </Pressable>
        <Pressable 
          style={[styles.button, {backgroundColor: 'red'}]}
          onPress={handleDelete}
        >
          <Text fontWeight="bold" color="white">Delete review</Text>
        </Pressable>
    </View>
    )}
    </SafeAreaView>
  ) 
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  column: {
    marginLeft: 10,
    display: 'flex',
    gap: 5,
  },
  blueCircle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary,
    padding: 5,
    borderRadius: 20,
    width: 40,
    height: 40,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
})

export default ReviewItem