import React from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, Image, SafeAreaView, StyleSheet } from 'react-native';
import { ShoppingCart, Heart, User, Clock, Home } from 'lucide-react';
import { Feather } from '@expo/vector-icons';
import { Searchbar ,Text} from 'react-native-paper';

const categories = [
  { id: '1', name: 'Electronics' },
  { id: '2', name: 'Clothing' },
  { id: '3', name: 'Home Goods' },
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
  return (
    <SafeAreaView style={styles.container}>
      <Header />

      {/* Banner (Placeholder for now) */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Your Banner Here</Text>
      </View>

      {/* Categories Grid */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity key={category.id} onPress={() => navigation.navigate('Category', { category: category.name })}>
            <CategoryCard title={category.name} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
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
  headerSubtitle: {
    fontSize: 16,
    color: '#888',
  },
  headerAddress: {
    fontSize: 14,
  },
  headerDelivery: {
    fontSize: 12,
    color: '#555',
  },
  expressButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  expressButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  freeDelivery: {
    fontSize: 12,
    color: '#555',
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
  categoryCard: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
