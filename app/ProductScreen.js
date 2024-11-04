// ProductScreen.js
import React from 'react';
import { View, Text, StyleSheet ,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';

const InnerProductCard = ({ title, onPress }) => (
    <TouchableOpacity style={styles.categoryCard} onPress={onPress}>
      <Text style={styles.categoryTitle}>{title}</Text>
    </TouchableOpacity>
  );


  const ProductCard = ({ title, onPress }) => (
    <TouchableOpacity style={styles.categoryCard} onPress={onPress}>
      <Text style={styles.categoryTitle}>{title}</Text>
    </TouchableOpacity>
  );
export default function ProductScreen({ route }) {
  const { subcategory } = route.params;
  const products = [
    { id: '1', name: 'Продукт 1' },
    { id: '2', name: 'Продукт 2'},
    { id: '3', name: 'Продукт 3'},
    { id: '4', name: 'Продукт 4'},
    { id: '5', name: 'Продукт 5'},
    { id: '6', name: 'Продукт 6'},
    { id: '7', name: 'Продукт 7'},
    { id: '8', name: 'Продукт 8'},
    { id: '9', name: 'Продукт 9'},
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Продукты в категории: {subcategory}</Text>
      <SafeAreaView style={styles.container}>
     
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Your Banner Here</Text>
        </View>
        <ScrollView contentContainerStyle={styles.categoriesContainer}>
          <View style={styles.row}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.name}
                onPress={() =>
                  navigation.navigate('Category', { category: cproductname })
                }
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
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
  