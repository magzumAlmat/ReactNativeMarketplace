// CheckoutScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { saveOrderDetails } from '../store/slices/orderSlice'; // Adjust the import path

const CheckoutScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux store
  const [address, setAddress] = useState('');
  const [time, setTime] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Calculate total price
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    // Dispatch action to save order details
    dispatch(saveOrderDetails({ address, time, additionalNotes, cartItems, totalAmount }));
    navigation.navigate('Payment'); // Navigate to Payment Screen after saving order
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.itemName}>{item.name} (x{item.quantity})</Text>
      <Text style={styles.itemPrice}>{item.price} ₸</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ваш заказ</Text>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.cartList}
      />
      <Text style={styles.total}>Общая сумма: {totalAmount} ₸</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Preferred time (e.g., 2 PM)"
        value={time}
        onChangeText={setTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Additional notes"
        value={additionalNotes}
        onChangeText={setAdditionalNotes}
      />
      <Button title="Оформить заказ" onPress={handleCheckout} disabled={!address || !time || cartItems.length === 0} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  cartList: { marginBottom: 20 },
  cartItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  itemName: { fontSize: 16 },
  itemPrice: { fontSize: 16, color: '#ff5252' },
  total: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});

export default CheckoutScreen;
