// ProductListScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProductListScreen({ route }) {
  const { category } = route.params;
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);
  const navigation = useNavigation();

  const categories = [
    {
      id: '1',
      name: 'Туалетная бумага и салфетки',
      subcategories: [
        'Туалетная бумага',
        'Бумажные полотенца',
        'Салфетки и платочки',
        'Влажные салфетки',
      ],
    },
    {
      id: '2',
      name: 'Для ванны и душа',
      subcategories: [],
    },
    {
      id: '3',
      name: 'Уход за полостью рта',
      subcategories: [],
    },
  ];

  const toggleAccordion = (categoryId) => {
    setExpandedCategoryId(categoryId === expandedCategoryId ? null : categoryId);
  };

  const handleSubcategoryPress = (subcategory) => {
    navigation.navigate('ProductScreen', { subcategory });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Поиск по каталогу"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.categoryContainer}>
            <TouchableOpacity onPress={() => toggleAccordion(item.id)}>
              <Text style={styles.categoryName}>{item.name}</Text>
            </TouchableOpacity>
            {expandedCategoryId === item.id && item.subcategories.length > 0 && (
              <View style={styles.subcategoriesContainer}>
                {item.subcategories.map((sub, index) => (
                  <TouchableOpacity key={index} onPress={() => handleSubcategoryPress(sub)}>
                    <Text style={styles.subcategory}>{sub}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  categoryContainer: { marginBottom: 20 },
  categoryName: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  subcategoriesContainer: { paddingLeft: 20, marginTop: 12 },
  subcategory: { fontSize: 20, color: '#666', paddingBottom: 5 },
});
