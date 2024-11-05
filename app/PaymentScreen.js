// PaymentScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { saveOrderDetails } from '../store/slices/orderSlice'; // Adjust the import path

const fakePaymentProcessing = async (cardNumber, expiration, cvv) => {
  // Simulate a payment processing delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate success
      resolve(true);
    }, 2000); // Simulate a 2-second delay for payment processing
  });
};

const PaymentScreen = ({ navigation }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');
  const dispatch = useDispatch();

  const handlePayment = async () => {
    // Validate input (you can add more validation as needed)
    if (!cardNumber || !expiration || !cvv) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const paymentSuccess = await fakePaymentProcessing(cardNumber, expiration, cvv);

    if (paymentSuccess) {
      // If payment is successful, save order details
      dispatch(saveOrderDetails({ cardNumber, expiration, cvv }));
      Alert.alert('Success', 'Payment successful! Your order is confirmed.');
    } else {
      Alert.alert('Error', 'Payment failed. Please try again.');
    }

  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Оплата</Text>
      <TextInput
        style={styles.input}
        placeholder="Card Number"
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={setCardNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Expiration (MM/YY)"
        value={expiration}
        onChangeText={setExpiration}
      />
      <TextInput
        style={styles.input}
        placeholder="CVV"
        keyboardType="numeric"
        secureTextEntry
        value={cvv}
        onChangeText={setCvv}
      />
      <Button title="Pay" onPress={handlePayment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});

export default PaymentScreen;
