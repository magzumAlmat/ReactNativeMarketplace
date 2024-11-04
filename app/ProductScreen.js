import React, { useEffect } from 'react';
import { Image, View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsAction } from "../store/slices/productSlice";
import { useNavigation } from '@react-navigation/native';



const openDetailsScreen=() =>{
  return(
  <View style={styles.container}>
  <Text style={styles.title}>Продукты в категории: {category}</Text>
  </View>
  )
}
const ProductCard = ({ title, image, price, product, onPress }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetails', { productId: product.id })}
    >
      <Image source={'/Users/billionare/Documents/DEVELOPMENT/REACT/ReactNativeMarketplace/MarketplaceBackend/public/cable/public/cable/_1730714278036.jpeg '}/>
      {/* /Users/billionare/Documents/DEVELOPMENT/REACT/ReactNativeMarketplace/MarketplaceBackend/public/cable/public/cable/_1730714278036.jpeg */}
      <Image source={{ uri: '/Users/billionare/Documents/DEVELOPMENT/REACT/ReactNativeMarketplace/MarketplaceBackend/public/cable/'+image }} style={styles.productImage} />
      <Text style={styles.productTitle}>{title}</Text>
      <Text style={styles.productPrice}>{price} ₸</Text>
    </TouchableOpacity>
  );
};




// export default function ProductScreen({ route }) {
//   const navigation = useNavigation();
//   const { category } = route.params;

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getAllProductsAction());
//   }, [dispatch]);

//   const productsFromSlice = useSelector((state) => state.product.allProducts);

//   const selectedProducts = productsFromSlice.filter(
//     (product) => product.mainType === category
//   );


//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Продукты в категории: {category}</Text>
//       <SafeAreaView style={styles.container}>
//         <ScrollView contentContainerStyle={styles.productsContainer}>
//           <View style={styles.row}>
//             {selectedProducts.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 title={product.name}
//                 image={product.image}
//                 price={product.price}
//                 // onPress={() => navigation.navigate('ProductDetailsScreen', { product: product })}
//                 onPress={()=>openDetailsScreen()}
//               />
//             ))}
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </View>
//   );
// }

export default function ProductScreen({ route }) {
  const { category } = route.params;
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [dispatch]);

  const productsFromSlice = useSelector((state) => state.product.allProducts);
  const selectedProducts = productsFromSlice.filter(
    (product) => product.mainType === category
  );


  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Продукты в категории: {category}</Text>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.productsContainer}>
          <View style={styles.row}>
            {selectedProducts.map((product) => (

              console.log('this is product from ProductScreen= ',product),
              <ProductCard
                key={product.id}
                title={product.name}
                // image={image}
                price={product.price}
                product={product} // Pass the entire product
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  productsContainer: { paddingVertical: 10 },
  row: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  productCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
  },
  productImage: { width: 100, height: 100, marginBottom: 10, borderRadius: 8 },
  productTitle: { fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 },
  productPrice: { fontSize: 16, color: '#ff5252', fontWeight: 'bold' },
});
