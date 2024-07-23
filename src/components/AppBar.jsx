import { StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const AppBar = () => {
  return ( 
    <SafeAreaView style={styles.safeArea}>
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
        <AppBarTab text="Repositories" link="/" />
        <AppBarTab text="Sign In" link="/SignIn" />
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