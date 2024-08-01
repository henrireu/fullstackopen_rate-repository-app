import { View, StyleSheet, Image, Pressable } from "react-native";
import { useQuery } from "@apollo/client";
import * as Linking from 'expo-linking';
import { useParams } from "react-router-native";

import Text from "./Text";
import theme from "../theme";
import { REPOSITORY_BY_ID } from "../graphql/queries";
import ReviewList from "./ReviewList";

const SingleRepositoryItem =() => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(REPOSITORY_BY_ID, {
    variables: { id: id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return null;
  if (error) {
    console.error(error);
    return null;
  }

  if(data) {
    console.log(data)
  }

  const handlePress = () => {
    console.log(id)
  }

  // eli id näyttäisi olevan fullName mutta / korvattu .
  const handleLink = () => {
    if (data) {
      console.log(data.repository.url);
      Linking.openURL(data.repository.url);
    }
  };

    return (
      <>
      <Pressable onPress={handlePress}>
        <View style={styles.container} testID="repositoryItem">
          <View style={styles.row}>
            <Image
              style={styles.image}
              source={{
                uri: data.repository.ownerAvatarUrl
              }}
            />
            <View style={{ gap: 5}}>
              <Text fontWeight="bold">Full name: {data.repository.fullName}</Text>
              <Text>Description: {data.repository.description}</Text>
              <View style={styles.blueBG}>
                <Text color="white">{data.repository.language}</Text>
              </View>
            </View>
          </View>
          <NumbersView allProps={data.repository}/>
        </View>
      </Pressable>
     
        
        <Pressable onPress={handleLink}>
          <View style={{...styles.blueBG, width: '90%', alignSelf: 'center'}}>
            <Text color="white">Linkki githubiin</Text>
          </View>
        </Pressable>
        <ReviewList id={id}/>
        
      
      </>
    );
};

const NumbersView = ({allProps}) => {

    const NumberFunction = ({number}) => {
        if (number > 999) {
            return <Text fontWeight="bold">{(number / 1000).toFixed(1)} k</Text>
        } else {
            return <Text fontWeight="bold">{number}</Text>
        }
    }

    return (
        <View style={styles.numbersview}>
          <View>
            <NumberFunction number={allProps.stargazersCount} />
            <Text>Stars</Text>
          </View>
          <View>
            <NumberFunction number={allProps.forksCount} />
            <Text>Forks</Text>
          </View>
          <View>
            <NumberFunction number={allProps.reviewCount} />
            <Text>Reviews</Text>
          </View>
          <View>
            <NumberFunction number={allProps.ratingAverage} />
            <Text>Rating</Text>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
      padding: 20,
      display: 'flex',
      gap: 10,
  },
  image: {
      height: 50,
      width: 50,
      borderRadius: 8
  },
  row: {
      display: 'flex',
      flexDirection: 'row',
      gap: 10
  },
  numbersview: {
      paddingHorizontal: 20,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
  },
  blueBG: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.backgroundColors.blue,
      alignSelf: 'flex-start',
      padding: 5,
      borderRadius: 4,
  }
})

export default SingleRepositoryItem;