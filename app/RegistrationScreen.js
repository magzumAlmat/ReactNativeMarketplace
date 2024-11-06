import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const RegistrationScreen = ({ navigation ,route}) => {
  const { orderData } = route.params;
  console.log('this is orderDataFromProps= ',orderData)
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  
  // Функция для отправки OTP
  const handleSendOtp = () => {
    axios
      .post('http://localhost:8000/send-otp', { phoneNumber })
      .then(() => {
        setIsOtpSent(true);
        Alert.alert('Успех', 'OTP отправлен на ваш номер!');
      })
      .catch((error) => {
        Alert.alert('Ошибка', error.message);
      });
  };

  // Функция для верификации OTP
  const handleVerifyOtp = () => {
    axios
      .post('http://localhost:8000/verify-otp', { phoneNumber, otp })
      .then(() => {
        Alert.alert('Успех', 'Верификация успешна!');
        // Перейти к главному экрану после успешной верификации
        navigation.replace('Main');
      })
      .catch((error) => {
        Alert.alert('Ошибка', 'Неверный код OTP');
      });
  };


  const handleContinueWithoutRegistration = () => {
    navigation.navigate('UserDetails', {orderData});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вход</Text>
      {!isOtpSent ? (
        <>
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Введите номер телефона"
            keyboardType="phone-pad"
            style={styles.input}
          />
          <TouchableOpacity onPress={handleSendOtp} style={styles.button}>
            <Text style={styles.buttonText}>Отправить SMS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleContinueWithoutRegistration}
            style={[styles.button, styles.secondaryButton]}
          >
            <Text style={styles.buttonText}>Продолжить без регистрации</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            value={otp}
            onChangeText={setOtp}
            placeholder="Введите код OTP"
            keyboardType="number-pad"
            style={styles.input}
          />
          <TouchableOpacity onPress={handleVerifyOtp} style={styles.button}>
            <Text style={styles.buttonText}>Подтвердить OTP</Text>
          </TouchableOpacity>
        </>
      )}
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

export default RegistrationScreen;
