import React from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet, Text ,TouchableOpacity} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import { store } from '../store';

const categories = [
  { id: '1', name: 'Бакалея' },
  { id: '2', name: 'Напитки' },
  { id: '3', name: 'Уход и здоровье' },
  { id: '4', name: 'Бытовая химия' },
  { id: '5', name: 'Для детей' },
  { id: '6', name: 'Авто товары' },
  { id: '7', name: 'Домашние товары' },
  { id: '8', name: 'Алкоголь' },
  { id: '9', name: 'Товары для животных' },
];

const Header = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  return (
    <View style={styles.headerContainer}>
      {/* <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      /> */}
      <Text style={{ marginTop: 10 }}>Адрес Абая 130</Text>
    </View>
  );
};

const CategoryCard = ({ title, onPress }) => (
  <TouchableOpacity style={styles.categoryCard} onPress={onPress}>
    <Text style={styles.categoryTitle}>{title}</Text>
  </TouchableOpacity>
);

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Your Banner Here</Text>
        </View>
        <ScrollView contentContainerStyle={styles.categoriesContainer}>
          <View style={styles.row}>
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                title={category.name}
                onPress={() =>
                  navigation.navigate('Category', { category: category.name })
                }
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
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
