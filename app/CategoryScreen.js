import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';

const InnerCategoryCard = ({ title, onPress }) => (
  <TouchableOpacity style={styles.categoryCard} onPress={onPress}>
    <Text style={styles.categoryTitle}>{title}</Text>
  </TouchableOpacity>
);

export default function CategoryScreen({ route, navigation }) {
  const { category } = route.params;
  const [searchTerm, setSearchTerm] = useState('');

  const productListCategories = [
    { id: '1', name: ' Категория 1' },
    { id: '2', name: 'Категория 2'},
    { id: '3', name: 'Категория 3'},
    { id: '4', name: 'Категория 4'},
    { id: '5', name: 'Категория 5'},
    { id: '6', name: 'Категория 6'},
    { id: '7', name: 'Категория 7'},
    { id: '8', name: 'Категория 8'},
    { id: '9', name: 'Категория 9'},
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category}</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Поиск..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <ScrollView>
        <Text>Additional categories or search results will be displayed here.</Text>
      </ScrollView>
      <ScrollView contentContainerStyle={styles.categoriesContainer}>
        <View style={styles.row}>
          {productListCategories.map((item) => (
            <InnerCategoryCard
              key={item.id}
              title={item.name}
              onPress={() =>
                navigation.navigate('ProductList', { category: item.name })
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
