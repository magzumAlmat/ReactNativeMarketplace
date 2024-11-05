import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TextInput, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrdersAction, updateOrderAction, deleteOrderAction } from '../store/slices/orderSlice'; // Adjust the import path

const OrdersScreen = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editedOrder, setEditedOrder] = useState({});

  // Fetch orders when the component mounts
  useEffect(() => {
    dispatch(fetchOrdersAction());
  }, [dispatch]);

  // Handle updating the order
  const handleUpdateOrder = (orderId) => {
    if (Object.keys(editedOrder).length > 0) {
      dispatch(updateOrderAction(orderId, editedOrder));
      setEditingOrderId(null); // Reset editing state
      setEditedOrder({}); // Clear the edited order
    }
  };

  // Handle deleting an order
  const handleDeleteOrder = (orderId) => {
    Alert.alert(
      'Удалить заказ',
      'Вы уверены, что хотите удалить этот заказ?',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Удалить', onPress: () => dispatch(deleteOrderAction(orderId)) },
      ]
    );
  };

  // Set editing fields when editing an order
  const handleEditOrder = (order) => {
    setEditingOrderId(order.id);
    setEditedOrder({ ...order }); // Initialize edited order with current values
  };

  // Handle change in any field of the order
  const handleInputChange = (field, value) => {
    setEditedOrder((prevOrder) => ({ ...prevOrder, [field]: value }));
  };

  // Render each order item
  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      {editingOrderId === item.id ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Новый адрес"
            value={editedOrder.address}
            onChangeText={(value) => handleInputChange('address', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Новый статус"
            value={editedOrder.status}
            onChangeText={(value) => handleInputChange('status', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Примечания"
            value={editedOrder.additionalNotes}
            onChangeText={(value) => handleInputChange('additionalNotes', value)}
          />
          <Button title="Сохранить" onPress={() => handleUpdateOrder(item.id)} />
        </>
      ) : (
        <>
          <Text style={styles.orderText}>Заказ ID: {item.id}</Text>
          <Text style={styles.orderText}>Адрес: {item.address}</Text>
          <Text style={styles.orderText}>Статус: {item.status}</Text>
          <Text style={styles.orderText}>Примечания: {item.additionalNotes}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Редактировать" onPress={() => handleEditOrder(item)} />
            <Button title="Удалить" color="red" onPress={() => handleDeleteOrder(item.id)} />
          </View>
        </>
      )}
    </View>
  );

  // Render the main component
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Мои заказы</Text>
      {loading ? (
        <Text>Загрузка...</Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  orderItem: { marginBottom: 15, padding: 10, borderWidth: 1, borderColor: '#ccc' },
  orderText: { fontSize: 16 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginVertical: 5,
  },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  errorText: { color: 'red', marginTop: 10 },
});

export default OrdersScreen;