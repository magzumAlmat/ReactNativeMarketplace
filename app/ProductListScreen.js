// ProductListScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import{getAllProductsAction,
  getAllProductsReducer,
  } from "../store/slices/productSlice";
  import { useEffect } from 'react';
  import { useDispatch ,useSelector} from 'react-redux';



  const CategoryCard = ({ title, onPress }) => (
    <TouchableOpacity style={styles.categoryCard} onPress={onPress}>
      <Text style={styles.categoryTitle}>{title}</Text>
    </TouchableOpacity>
  );
  
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

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [productsFromSlice]);
  const productsFromSlice = useSelector((state) => state.product.allProducts);

  // Ensure unique mainTypes using a Map
  const uniqueProducts = Array.from(
    new Map(productsFromSlice.map((item) => [item.mainType, item])).values()
  );

  // Filter unique products based on the selected category
  const selectedProducts = uniqueProducts.filter(
    (product) => product.type === category
  );
 

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

      <View style={styles.row}>
            {selectedProducts.map((item) => (
              <CategoryCard
                key={item.id}
                title={item.mainType}
                onPress={() =>
                  navigation.navigate('ProductScreen', { category: item.mainType },handleSubcategoryPress())
                }
              />
            ))}
          </View>
      {/* <FlatList
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
      /> */}
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: '#fff' },
//   searchInput: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//   },
//   categoryContainer: { marginBottom: 20 },
//   categoryName: { fontSize: 22, fontWeight: 'bold', color: '#333' },
//   subcategoriesContainer: { paddingLeft: 20, marginTop: 12 },
//   subcategory: { fontSize: 20, color: '#666', paddingBottom: 5 },
// });


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
