import React, { useEffect, useRef } from 'react';
import { FlatList, Image, View, ScrollView, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import { store } from '../store';
import { getAllProductsAction } from '../store/slices/productSlice';

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
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Адрес Абая 130</Text>
    </View>
  );
};

const CategoryCard = ({ title, onPress }) => (
  <TouchableOpacity style={styles.categoryCard} onPress={onPress}>
    <Text style={styles.categoryTitle}>{title}</Text>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const productsFromSlice = useSelector((state) => state.product.allProducts);

  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [dispatch]);

  // Ensure unique mainTypes using a Map
  const uniqueProducts = Array.from(
    new Map(productsFromSlice.map((item) => [item.typeOfGood, item])).values()
  );

  const flatListRef = useRef();
  let index = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      index = (index + 1) % images.length;
      flatListRef.current.scrollToIndex({ animated: true, index });
    }, 3000); // Slide every 3 seconds

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
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Header />
          
          {/* Banner Section */}
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

          {/* Category Section */}
          <View style={styles.categoriesContainer}>
            <Text style={styles.categoriesTitle}>Категории</Text>
            <View style={styles.row}>
              {uniqueProducts.map((item) => (
                <CategoryCard
                  key={item.id}
                  title={item.typeOfGood}
                  onPress={() => navigation.navigate('Category', { category: item.typeOfGood })}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingVertical: 10,
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  banner: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: 400,
    height: 200,
    marginRight: 16,
    borderRadius: 8,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default HomeScreen;
