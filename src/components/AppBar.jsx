import { StyleSheet, ScrollView, SafeAreaView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { useQuery } from '@apollo/client';
import { useApolloClient } from '@apollo/client';

import theme from '../theme';
import AppBarTab from './AppBarTab';
import { ME } from '../graphql/queries';
import Text from './Text';
import useAuthStorage from '../hooks/useAuthStorage';

const AppBar = () => {
  const { data, loading, error } = useQuery(ME, { 
    fetchPolicy: 'cache-and-network',
  });
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  if (loading) {
    return <></>
  }
  if (error) {
    console.error(error)
  }

  const handleLogOut = async () => {
    await authStorage.removeAccessToken()
    apolloClient.resetStore();
  }

  return ( 
    <SafeAreaView style={styles.safeArea}>
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
        <AppBarTab text="Repositories" link="/" />
        {data.me === null ? (
          <AppBarTab text="Sign In" link="/SignIn" />
        ) : (
          <Pressable onPress={handleLogOut}>
            <Text color="white" fontWeight="bold">Sign out</Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.backgroundColors.dark,
  },
  scrollViewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
});

export default AppBar;