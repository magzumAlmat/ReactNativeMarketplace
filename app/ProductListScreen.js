// ProductListScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function ProductListScreen({ route }) {
  const { category } = route.params;

  // Пример списка товаров (можно заменить на ваши данные)
  const products = [
    { id: '1', name: 'Товар 1', price: '1000₸' },
    { id: '2', name: 'Товар 2', price: '2000₸' },
    { id: '3', name: 'Товар 3', price: '1500₸' },
    { id: '4', name: 'Товар 4', price: '2500₸' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Товары в категории: {category}</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  productCard: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    elevation: 3,
  },
  productName: { fontSize: 16, fontWeight: '500' },
  productPrice: { fontSize: 14, color: 'gray', marginTop: 5 },
});
