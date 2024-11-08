import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView,TextInput,Alert } from 'react-native';
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { setAuth } from '../store/slices/userSlice';
// Данные профиля (можно заменить реальными данными пользователя)
const profileData = {
  name: 'Ваше имя',
  email: 'example@email.com',
  phone: '+7 (123) 456-78-90',
  profileImage: 'https://via.placeholder.com/150',
};



const ProfileScreen = ({navigation}) => {
  const userState = useSelector((state) => state.user);
  console.log('userState from Profile screen= ',userState)
  // const {
  //     userPassID,
  //     userId,
  //     isAuth,
  //     userInfo,
  //     userPhone,
  //     userStreetOrHomeNumber,
  //     userApartmentOrOffice,
  //     userEntrance,
  //     userFloor,
  //     userOrderIds,
  //     clickCount,
  //     message
  //   } = useSelector((state) => state.user);

  

  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  
 

  // Функция для отправки OTP
  const handleSendOtp = () => {
    // axios
    //   .post('http://localhost:8000/send-otp', { phoneNumber })
    //   .then(() => {
        setIsOtpSent(true);
        Alert.alert('Успех', 'OTP отправлен на ваш номер!');
      // })
      // .catch((error) => {
      //   Alert.alert('Ошибка', error.message);
      // });
  };

  // Функция для верификации OTP
  const handleVerifyOtp = ({navigate}) => {
    // axios
    //   .post('http://localhost:8000/verify-otp', { phoneNumber, otp })
    //   .then(() => {
    //     Alert.alert('Успех', 'Верификация успешна!');
        // Перейти к главному экрану после успешной верификации
        if (otp==1111){
        navigation.navigate('UserDetailsSecondScreen');}
      // })
      // .catch((error) => {
      //   Alert.alert('Ошибка', 'Неверный код OTP');
      // });
  };


  const handleContinueWithoutRegistration = () => {
    navigation.navigate('Main');
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
    flexGrow: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 2,
  },
  phone: {
    fontSize: 16,
    color: '#6b7280',
  },
  actionsContainer: {
    width: '100%',
  },
  actionButton: {
    backgroundColor: '#DC2626',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
    }
});

export default ProfileScreen;
