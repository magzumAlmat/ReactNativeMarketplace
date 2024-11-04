import React from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, Image, SafeAreaView, StyleSheet } from 'react-native';
import { ShoppingCart, Heart, User, Clock, Home } from 'lucide-react';
import { Feather } from '@expo/vector-icons';
import { Searchbar ,Text} from 'react-native-paper';

import { Provider } from 'react-redux';
import { store } from '../store';

import { useSelector, useDispatch } from 'react-redux'

import { useEffect } from 'react';

import { fetchUserData } from '../store/slices/productSlice';


const categories = [
    { id: '1', name: 'Electronics' },
    { id: '2', name: 'Clothing' },
    { id: '3', name: 'Home Goods' },
    { id: '4', name: 'Toys' },
    { id: '5', name: 'Books' },
    { id: '6', name: 'Furniture' },
    { id: '7', name: 'Jewelry' },
    { id: '8', name: 'Sporting Goods' },
    { id: '9', name: 'Beauty' },
    { id: '10', name: 'Groceries' },
    { id: '11', name: 'Footwear' },
    { id: '12', name: 'Accessories' },
    { id: '13', name: 'Automotive' },
    { id: '14', name: 'Gardening' },
    { id: '15', name: 'Stationery' },
    { id: '16', name: 'Pet Supplies' },
  ];

const Header = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
return(
  <View style={styles.headerContainer}>
   <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />

    <Text/>
     <Text variant="titleSmall">Адрес Абая 130</Text>
  </View>);
};

// Category Card Component
const CategoryCard = ({ title }) => (
  <View style={styles.categoryCard}>
    <Text style={styles.categoryTitle}>{title}</Text>
  </View>
);

export default function HomeScreen({ navigation }) {

  const testVarFromSlice = useSelector((state) => state.product.testVar)
  const dispatch = useDispatch()

  console.log(testVarFromSlice)
  return (
    <Provider store={store}>
    <SafeAreaView style={styles.container}>
      <Header />

      {/* Banner (Placeholder for now) */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Your Banner Here</Text>
      </View>

      {/* Categories Grid */}
      <ScrollView contentContainerStyle={styles.categoriesContainer}>
        <View style={styles.row}>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.name}
              onPress={() => navigation.navigate('Category', { category: category.name })}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
    </Provider>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  banner: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    marginBottom: 16,
  },
  bannerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  categoryCard: {
    width: '47%', // Each card will take about half the width
    backgroundColor: '#fff',
    padding: 30,
    marginVertical: 7,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});