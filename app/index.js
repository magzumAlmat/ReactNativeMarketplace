import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, SafeAreaView, StyleSheet } from 'react-native';
import { ShoppingCart, Heart, User, Clock, Home } from 'lucide-react';
import { Feather } from '@expo/vector-icons';
import { Link } from "expo-router";

import { Provider } from 'react-redux';
import { store } from '../store';

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./HomeScreen";

import CategoryScreen from './CategoryScreen';
import ProductListScreen from './ProductListScreen';
import ProductScreen from './ProductScreen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const OrdersScreen = () => (
  <View style={styles.centerScreen}>
    <Text>Мои заказы</Text>
  </View>
);

const FavoritesScreen = () => (
  <View style={styles.centerScreen}>
    <Text>Избранное</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.centerScreen}>
    <Text>Профиль</Text>
  </View>
);

const CartScreen = () => (
  <View style={styles.centerScreen}>
    <Text>Корзина</Text>
  </View>
);

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Configure your app here.</Text>
    </View>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  );
}


export default function Page() {

  // useEffect(() => {
  //   dispatch(fetchUserData());
  // }, [dispatch]);


  // const testVarFromSlice = useSelector((state) => state.product.testVar)
  // const dispatch = useDispatch()

  // console.log(testVarFromSlice)
  
  return (
     <Provider store={store}>
 
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#DC2626',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          }}
        >
          {/* <Tab.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Feather name="settings" size={size} color={color} />
              ),
            }}
          /> */}
          <Tab.Screen
            name="Каталог"
            component={HomeStack} // Используем HomeStack вместо HomeScreen
            options={{
              tabBarIcon: ({ color, size }) => (
                <Feather name="home" size={size} color={color} />
              ),
            }}
          />

         
          <Tab.Screen 
            name="Мои заказы" 
            component={OrdersScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Feather name="clock" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen 
            name="Избранное" 
            component={FavoritesScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Feather name="heart" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen 
            name="Профиль" 
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Feather name="user" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen 
            name="Корзина" 
            component={CartScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Feather name="shopping-cart" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>

   </Provider>

  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     padding: 24,
//   },
//   main: {
//     flex: 1,
//     justifyContent: "center",
//     maxWidth: 960,
//     marginHorizontal: "auto",
//   },
//   title: {
//     fontSize: 64,
//     fontWeight: "bold",
//   },
//   subtitle: {
//     fontSize: 36,
//     color: "#38434D",
//   },
// });


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  headerTitle: {
    color: '#DC2626',
    fontSize: 20,
    marginLeft: 8,
    fontWeight: '600',
  },
  searchBar: {
    marginTop: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchText: {
    color: '#9ca3af',
    marginLeft: 8,
  },
  addressContainer: {
    marginTop: 16,
  },
  address: {
    fontSize: 16,
  },
  addressNote: {
    color: '#DC2626',
    fontSize: 14,
  },
  expressButton: {
    marginTop: 16,
    backgroundColor: '#e5e7eb',
    padding: 16,
    borderRadius: 8,
  },
  expressButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expressButtonText: {
    marginLeft: 8,
    fontWeight: '500',
  },
  deliveryText: {
    color: '#4b5563',
    marginTop: 4,
  },
  banner: {
    width: '100%',
    height: 160,
    marginTop: 16,
  },
  categoriesContainer: {
    padding: 16,
  },
  categoryRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  categoryCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 8,
  },
  categoryImage: {
    width: '100%',
    height: 96,
    borderRadius: 8,
  },
  categoryTitle: {
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
  centerScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});