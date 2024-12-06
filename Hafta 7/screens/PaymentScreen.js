import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground, TextInput, Modal } from 'react-native';

export default function PaymentScreen({ route, navigation }) {
  const onPayment = route?.params?.onPayment ?? (() => {});
  const [timeLeft, setTimeLeft] = useState(12 * 60 * 60);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    fullName: '',
    expiryDate: '',
  });

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePayment = () => {
    setModalVisible(true); // Modal'ı göster
  };

  const handleConfirmPayment = () => {
    Alert.alert('Ödeme Başarılı', 'Ödemeniz başarılı bir şekilde alınmıştır.', [
      {
        text: 'Tamam',
        onPress: () => {
          setPaymentStatus(true);
          setModalVisible(false);
          onPayment();
        },
      },
    ]);
  };

  const handleReplay = () => {
    navigation.navigate('GameScreen');
  };

  return (
    <ImageBackground
      source={require('../assets/images/turkish_airlines_logo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Maalesef tüm haklarınız bitti :(</Text>
        <Text style={styles.paymentText}>
          {timeLeft > 0
            ? `Kalan Süre: ${formatTime(timeLeft)}`
            : 'Zaman doldu, tekrar oynamak için ödeme yapabilirsiniz!'}
        </Text>
        {!paymentStatus && (
          <Text style={styles.infoText}>
            Beklemek istemiyorsanız, 35 TL ödeyerek hemen devam edin.
          </Text>
        )}
        {paymentStatus ? (
          <TouchableOpacity style={styles.replayButton} onPress={handleReplay}>
            <Text style={styles.buttonText}>Tekrar Oyna</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
            <Text style={styles.buttonText}>Öde ve Devam Et</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Modal Ödeme Formu */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Kart Bilgilerinizi Girin</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Kart Numarası"
              value={cardDetails.cardNumber}
              onChangeText={(text) => setCardDetails({ ...cardDetails, cardNumber: text })}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Ad Soyad"
              value={cardDetails.fullName}
              onChangeText={(text) => setCardDetails({ ...cardDetails, fullName: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Son Kullanım Tarihi"
              value={cardDetails.expiryDate}
              onChangeText={(text) => setCardDetails({ ...cardDetails, expiryDate: text })}
            />
            
            <TouchableOpacity style={styles.modalButton} onPress={handleConfirmPayment}>
              <Text style={styles.modalButtonText}>Ödemeyi Onayla</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  paymentText: {
    fontSize: 20,
    color: '#ccc',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 18,
    color: '#FF6F61',
    marginVertical: 20,
    textAlign: 'center',
  },
  paymentButton: {
    backgroundColor: '#FF6F61',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
  },
  replayButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
  },
  modalButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
