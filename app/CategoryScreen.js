import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAction } from "../store/slices/productSlice";

const InnerCategoryCard = ({ title, onPress }) => (
  <TouchableOpacity style={styles.categoryCard} onPress={onPress}>
    <Text style={styles.categoryTitle}>{title}</Text>
  </TouchableOpacity>
);

export default function CategoryScreen({ route, navigation }) {
  const { category } = route.params;
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [dispatch]);

  const productsFromSlice = useSelector((state) => state.product.allProducts);

  // Extract unique product types using a Set
  const uniqueProducts = Array.from(
    new Map(productsFromSlice.map((item) => [item.type, item])).values()
  );

  // Filter unique products based on searchTerm
  const filteredProducts = uniqueProducts.filter((item) =>
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedProducts = filteredProducts.filter(
    (product) => product.typeOfGood === category
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category}</Text>
      
      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Поиск..."
        value={searchTerm}
        onChangeText={setSearchTerm} // Update the search term here
      />

      {/* <ScrollView>
        <Text style={styles.infoText}>Additional categories or search results will be displayed here.</Text>
      </ScrollView> */}

      {/* Categories */}
      <ScrollView contentContainerStyle={styles.categoriesContainer}>
        <View style={styles.row}>
          {selectedProducts.map((item) => (
            <InnerCategoryCard
              key={item.id}
              title={item.type}
              onPress={() =>
                navigation.navigate('ProductList', { category: item.type })
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
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
  infoText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 15,
  },
  categoriesContainer: { paddingVertical: 1},
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
