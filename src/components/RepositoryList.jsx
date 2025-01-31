import { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useFormik } from 'formik';
import { useDebounce } from 'use-debounce';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginTop: 10,
  }, 
});
 
const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, setKeyword, /*infinite scrolling*/ onEndReach,  }) => {

  const repositoryNodes = repositories
    ? repositories.map((repository) => repository.node)
    : [];

  /*const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];*/

  return (
    <>
      <FlatList
        data={repositoryNodes}
        renderItem={({item}) => <RepositoryItem allProps={item} />}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={<SearchBar setKeyword={setKeyword}/>}
        /*infinite scrolling */
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5} 
      />
    </>
  )

};

const RepositoryList = () => {
  const [listOrder, setListOrder] = useState('latest');
  const [ keyword, setKeyword ] = useState('');
  //const { repositories } = useRepositories(listOrder, keyword);
  const { repositories, loading, error, fetchMore } = useRepositories(listOrder, keyword);

  // infinite scrolling
  const onEndReach = () => {
    console.log('You reached the end of the list');
    if (fetchMore) {
      fetchMore(); 
    }
  };

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  return (
    <>
    <OrderMenu listOrder={listOrder} setListOrder={setListOrder}/>
    <RepositoryListContainer repositories={repositories} setKeyword={setKeyword} onEndReach={onEndReach}/>
    </>
  )
   
};


const SearchBar = ({ setKeyword }) => {
  const formik = useFormik({
    initialValues: { keyword: '' }
  })

  const [value] = useDebounce(formik.values.keyword, 500)

  const onChangeText = (text) => {
    formik.setFieldValue('keyword', text);
  }

  useEffect(() => {
    setKeyword(value)
  }, [value, setKeyword]);

  return ( 
    <View>
      <TextInput 
        placeholder='Search repository'
        style={styles.input}
        value={formik.values.keyword}
        onChangeText={onChangeText}
      />
    </View>
  )
}

const OrderMenu = ({ listOrder, setListOrder }) => {

  return (
    <Picker
      style={{ backgroundColor: 'lightgrey'}}
      selectedValue={listOrder}
      onValueChange={(itemValue) =>
      setListOrder(itemValue)
    }>
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  );
}

export default RepositoryList;

/*const RepositoryList = () => {
  const { repositories } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <View>
        <FlatList
          data={repositoryNodes}
          renderItem={({item}) => <RepositoryItem allProps={item}/>}
          ItemSeparatorComponent={ItemSeparator}
        />
    </View>
  );
};*/

