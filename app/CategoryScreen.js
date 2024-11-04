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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category}</Text>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Поиск..."
        value={searchTerm}
        onChangeText={setSearchTerm} // Update the search term here
      />

      <ScrollView>
        <Text>Additional categories or search results will be displayed here.</Text>
      </ScrollView>
      <ScrollView contentContainerStyle={styles.categoriesContainer}>
        <View style={styles.row}>
          {filteredProducts.map((item) => (
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
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
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
