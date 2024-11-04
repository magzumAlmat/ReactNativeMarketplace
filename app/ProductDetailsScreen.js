// ProductDetailsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, updateCartItem } from '../store/slices/cartSlice'; // Adjust the import path

export default function ProductDetailsScreen({ route, navigation }) {
  const { productId } = route.params; // Get product ID from navigation params
  const dispatch = useDispatch(); // Get dispatch function

  // Get all products from Redux store
  const products = useSelector((state) => state.product.allProducts);
  const cartItems = useSelector((state) => state.cart.items); // Get cart items

  // Find the product using the product ID
  const product = products.find((item) => item.id === productId);
  
  // Find the current product's cart item
  const cartItem = cartItems.find(item => item.id === productId);
  
  const initialQuantity = cartItem ? cartItem.quantity : 1; // Start with 1 if already in cart, else default to 1
  const [quantity, setQuantity] = useState(initialQuantity); // Local state for quantity
  const [isAddedToCart, setIsAddedToCart] = useState(false); // State to track if item is added to cart

  const handleAddToCart = () => {
    const productWithQuantity = { ...product, quantity }; // Create product object with selected quantity
    if (cartItem) {
      dispatch(updateCartItem({ id: productId, quantity })); // Update quantity if already in cart
    } else {
      dispatch(addToCart(productWithQuantity)); // Dispatch addToCart action with the product
    }
    setIsAddedToCart(true); // Set state to indicate item is added to cart
    navigation.navigate('Cart'); // Redirect to Cart screen after adding the product
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1); // Increment local quantity state
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1); // Decrement local quantity state
    }
  };

  // Effect to update quantity if product is already in cart
  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItem,quantity]);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productTitle}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price} ₸</Text>
      <Text style={styles.productDescription}>{product.description}</Text>

      <View style={styles.quantityContainer}>
        <Button title="-" onPress={handleDecrement} disabled={isAddedToCart} />
        <Text style={styles.quantityText}>{quantity}</Text>
        <Button title="+" onPress={handleIncrement} disabled={isAddedToCart} />
      </View>

      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartButtonText}>Добавить в Корзину</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  productImage: { width: '100%', height: 200, marginBottom: 20, borderRadius: 10 },
  productTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  productPrice: { fontSize: 18, color: '#ff5252', fontWeight: 'bold', marginBottom: 10 },
  productDescription: { fontSize: 16, color: '#555' },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
  quantityText: { marginHorizontal: 10, fontSize: 18 },
  addToCartButton: {
    backgroundColor: '#ff5252',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
