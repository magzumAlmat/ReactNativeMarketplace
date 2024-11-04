// CartScreen.js
import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../store/slices/cartSlice';
import { decreaseProductQuantity } from '../store/slices/productSlice'; // Adjust the import path

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  
  const handleIncrement = (product) => {
    dispatch(incrementQuantity(product));
  };

  const handleDecrement = (product) => {
    dispatch(decrementQuantity(product));
  };

 
  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId)); // Dispatch remove action
    dispatch(decreaseProductQuantity(productId)); // Decrease product quantity in catalog
  };


  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.price} ₸</Text>
      <View style={styles.quantityContainer}>
        <Button title="-" onPress={() => handleDecrement(item)} disabled={item.quantity <= 1} />
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <Button title="+" onPress={() => handleIncrement(item)} />
      </View>
      <Button title="Remove" onPress={() => handleRemove(item.id)} color="red" />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      {cartItems.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <Button
        title="Checkout"
        onPress={() => navigation.navigate('Checkout')}
        disabled={cartItems.length === 0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  itemContainer: { marginBottom: 20, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 10 },
  itemTitle: { fontSize: 18, fontWeight: 'bold' },
  itemPrice: { fontSize: 16, color: '#ff5252' },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  quantityText: { marginHorizontal: 10, fontSize: 18 },
});

export default CartScreen;
