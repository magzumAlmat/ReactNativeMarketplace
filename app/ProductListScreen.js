import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAllProductsAction } from "../store/slices/productSlice";
import { useDispatch, useSelector } from 'react-redux';

const CategoryCard = ({ title, onPress }) => (
  <TouchableOpacity style={styles.categoryCard} onPress={onPress}>
    <Text style={styles.categoryTitle}>{title}</Text>
  </TouchableOpacity>
);

export default function ProductListScreen({ route }) {
  const { category } = route.params;
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [dispatch]);

  const productsFromSlice = useSelector((state) => state.product.allProducts);

  // Ensure unique mainTypes using a Map
  const uniqueProducts = Array.from(
    new Map(productsFromSlice.map((item) => [item.mainType, item])).values()
  );

  // Filter unique products based on the selected category
  const selectedProducts = uniqueProducts.filter(
    (product) => product.type === category
  );

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Поиск по каталогу"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <View style={styles.row}>
          {selectedProducts.map((item) => (
            <CategoryCard
              key={item.id}
              title={item.mainType}
              onPress={() =>
                navigation.navigate('ProductScreen', { category: item.mainType })
              }
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  searchInput: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  categoriesContainer: { paddingVertical: 10 },
  row: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  categoryCard: {
    width: '47%',
    backgroundColor: '#fff',
    paddingVertical: 25,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderRadius: 12,
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
