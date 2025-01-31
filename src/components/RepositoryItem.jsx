import { View, StyleSheet, Image, Pressable } from "react-native";
import { useNavigate } from "react-router-native";

import Text from "./Text";
import theme from "../theme";

const RepositoryItem =({ allProps }) => {
  const navigate = useNavigate();

  const modifiedId = allProps.fullName.replace('/', '.');

  const handlePress = () => {
    navigate(`/${modifiedId}`);
  };

    return (
      <>
      <Pressable onPress={handlePress}>
        <View style={styles.container} testID="repositoryItem">
          <View style={styles.row}>
            <Image
              style={styles.image}
              source={{
                uri: allProps.ownerAvatarUrl
              }}
            />
            <View style={{ gap: 5}}>
              <Text fontWeight="bold">Full name: {allProps.fullName}</Text>
              <Text>Description: {allProps.description}</Text>
              <View style={styles.blueBG}>
                <Text color="white">{allProps.language}</Text>
              </View>
            </View>
          </View>
          <NumbersView allProps={allProps}/>
        </View>
      </Pressable>
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

export default RepositoryItem;