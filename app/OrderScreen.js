import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TextInput, Alert ,ScrollView, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrdersAction, updateOrderAction, deleteOrderAction } from '../store/slices/orderSlice'; // Adjust the import path

const OrdersScreen = () => {
    const [refreshKey, setRefreshKey] = useState(0);
    const triggerRerender = () => {
      setRefreshKey((prevKey) => prevKey + 1);
    };
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
      setRefreshing(true);
      dispatch(fetchOrdersAction()).finally(() => setRefreshing(false));
      // console.log(rerend)
    };

  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editedOrder, setEditedOrder] = useState({});


  // Fetch orders when the component mounts
  useEffect(() => {
    dispatch(fetchOrdersAction());
    triggerRerender(); 
    console.log('Orders updated:', orders,refreshKey);
  }, [dispatch]);

  useEffect(() => {
    console.log('Orders updated:', orders,refreshKey);
  }, [orders]);

  // Handle updating the order
  const handleUpdateOrder = (orderId) => {
    console.log('сработал handleUpdateOrder')
    if (editedOrder.additionalNotes || editedOrder.time) {
      dispatch(updateOrderAction(orderId, editedOrder))
      .then(()=>{
        dispatch(fetchOrdersAction());
      })
      setEditingOrderId(null); // Reset editing state
      setEditedOrder({}); // Clear the edited order

        
        
        setRefreshKey(prev => prev + 1); // Trigger a re-render
      
    }
  };

// const handleUpdateOrder = (orderId) => {
//     console.log('handleUpdateOrder started')
//     if (editedOrder.address || editedOrder.phone) {
//       dispatch(updateOrderAction(orderId, editedOrder))
//         .then(() => {
//           // Re-fetch orders to update the UI
//           dispatch(fetchOrdersAction());
//           setEditingOrderId(null); // Reset editing state
//           setEditedOrder({}); // Clear the edited order
//         })
//         .catch((error) => {
//           Alert.alert('Ошибка', 'Не удалось обновить заказ. Пожалуйста, попробуйте снова.');
//           console.error('Update failed:', error);
//         });
//     }
//   };

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
    setEditedOrder({ address: order.additionalNotes, phone: order.time }); // Initialize edited order with address and phone
  };

  // Handle change in address or phone field
  const handleInputChange = (field, value) => {
    setEditedOrder((prevOrder) => ({ ...prevOrder, [field]: value }));
  };

  // Render each order item
  const renderOrderItem = ({ item }) => (
    console.log('item from my orders= ',item),
    
    <View style={styles.orderItem}>
        
      {editingOrderId === item.id ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Комментарий курьеру"
            value={editedOrder.additionalNotes}
            onChangeText={(value) => handleInputChange('additionalNotes', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Новое время"
            value={editedOrder.time}
            onChangeText={(value) => handleInputChange('time', value)}
          />
          <Button title="Сохранить" onPress={() => handleUpdateOrder(item.id)} />
        </>
      ) : (
        <>
   
          {/* <Text style={styles.orderText}>Заказ ID: {item.id}</Text> */}
          <Text style={styles.orderText}>Комментарий курьеру: {item.additionalNotes}</Text>
          <Text style={styles.orderText}>Время доставки: {item.time}</Text>
          <Text style={styles.orderText}>Статус: {item.status}</Text>
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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