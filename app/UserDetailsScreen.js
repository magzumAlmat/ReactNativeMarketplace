import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  setPhone,
  setStreetOrHomeNumber,
  setApartmentOrOffice,
  setEntrance,
  setFloor,
} from '../store/slices/guestUserSlice'; // Adjust the import path as needed

import { createProfileAction } from '../store/slices/guestUserSlice';
const UserDetailsScreen = ({navigation ,route}) => {
  const { orderData } = route.params;
  console.log('ORDER DATA FROM USER DETAILSSCREEN= ',orderData.id)

  const OrderId=orderData.id
  // const orderDataIds=orderData.map((item)=>{
  //   console.log('item= ',item)
  // })
  const dispatch = useDispatch();

  // Local state for input fields
  const [phone, setPhoneInput] = useState('');
  const [streetOrHomeNumber, setStreetOrHomeNumberInput] = useState('');
  const [apartmentOrOffice, setApartmentOrOfficeInput] = useState('');
  const [entrance, setEntranceInput] = useState('');
  const [floor, setFloorInput] = useState('');

  // Handle form submission
  const handleSubmit = () => {
    console.log('Сработал handleSubmit')
    
    const profileData = {
      phone,
      streetOrHomeNumber,
      apartmentOrOffice,
      entrance,
      floor,
      OrderId



    };

    dispatch(createProfileAction({ profileData }));


    // Show success message
    // Alert('Данные сохранены', 'Ваши данные успешно сохранены!');

    navigation.navigate('Payment', {orderData,profileData});
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Заполните данные</Text>
      <TextInput
        value={phone}
        onChangeText={setPhoneInput}
        placeholder="Телефон"
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TextInput
        value={streetOrHomeNumber}
        onChangeText={setStreetOrHomeNumberInput}
        placeholder="Улица или номер дома"
        style={styles.input}
      />
      <TextInput
        value={apartmentOrOffice}
        onChangeText={setApartmentOrOfficeInput}
        placeholder="Квартира или офис"
        style={styles.input}
      />
      <TextInput
        value={entrance}
        onChangeText={setEntranceInput}
        placeholder="Подъезд"
        style={styles.input}
      />
      <TextInput
        value={floor}
        onChangeText={setFloorInput}
        placeholder="Этаж"
        keyboardType="number-pad"
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Сохранить данные</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#DC2626',
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default UserDetailsScreen;
