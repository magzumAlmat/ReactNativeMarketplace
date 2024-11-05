import React from 'react';
import {FlatList, Image,View, ScrollView, SafeAreaView, StyleSheet, Text ,TouchableOpacity} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import { store } from '../store';
import { useRef,useEffect } from 'react';
const categories = [
  { id: '1', name: 'Бакалея' },
  { id: '2', name: 'Напитки' },
  { id: '3', name: 'Уход и здоровье' },
  { id: '4', name: 'Бытовая химия' },
  { id: '5', name: 'Для детей' },
  { id: '6', name: 'Авто товары' },
  { id: '7', name: 'Домашние товары' },
  { id: '8', name: 'Алкоголь' },
  { id: '9', name: 'Товары для животных' },
  { id: '10', name: 'Еще ченить' },
];





const Header = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  return (
    <View style={styles.headerContainer}>
      {/* <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      /> */}
      <Text style={{ marginTop: 10 }}>Адрес Абая 130</Text>
    </View>
  );
};

const CategoryCard = ({ title, onPress }) => (
  <TouchableOpacity style={styles.categoryCard} onPress={onPress}>
    <Text style={styles.categoryTitle}>{title}</Text>
  </TouchableOpacity>
);

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();


  const flatListRef = useRef();
  let index = 0;


  useEffect(() => {
    const interval = setInterval(() => {
      index = (index + 1) % images.length;
      flatListRef.current.scrollToIndex({ animated: true, index });
    }, 3000); // Slide every  seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);


const images = [
  { id: '1', url: 'https://via.placeholder.com/400x200?text=Image+1' },
  { id: '2', url: 'https://via.placeholder.com/400x200?text=Image+2' },
  { id: '3', url: 'https://via.placeholder.com/400x200?text=Image+3' },
  { id: '4', url: 'https://via.placeholder.com/400x200?text=Image+4' },
  { id: '5', url: 'https://via.placeholder.com/400x200?text=Image+5' },
];

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
       
        <ScrollView contentContainerStyle={styles.categoriesContainer}>
        <Header />
        <View style={styles.banner}>
        <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image source={{ uri: item.url }} style={styles.image} />
        )}
      />
        
        </View>
          <View style={styles.row}>
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                title={category.name}
                onPress={() =>
                  navigation.navigate('Category', { category: category.name })
                }
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  // container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  image: { width: 400 , height: 200, marginRight: 16, borderRadius: 8 },
  headerContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  banner: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    marginBottom: 16,
  },
  categoriesContainer: { paddingVertical: 10 },
  row: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' },
  categoryCard: {
    width: '47%',
    backgroundColor: '#fff',
    padding: 30,
    marginVertical: 7,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  categoryTitle: { fontSize: 16, fontWeight: 'bold' },
});
