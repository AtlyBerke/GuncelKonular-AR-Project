  import React, { useState } from 'react';
  import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Modal as RNModal } from 'react-native'; // react-native Modal'ı RNModal olarak isimlendirdik
  import Modal from 'react-native-modal'; // react-native-modal Modal'ı aynı isimle bırakıyoruz

  export default function GameOverScreen({ navigation }) {
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [cardDetails, setCardDetails] = useState({
      cardNumber: '',
      fullName: '',
      expiryDate: '',
    });

    const handlePayment = () => {
      setModalVisible(true); // Modal'ı aç
    };

    const handleConfirmPayment = () => {
      // Ödeme bilgileri kontrolü yapılabilir
      setPaymentSuccess(true);
      setModalVisible(false);
    };

    const handleReplay = () => {
      navigation.navigate('GameScreen'); // GameScreen'e yönlendirme
    };

    const handleNewLevel = () => {
      alert('Yakında uygulamanıza tanımlanacak');
    };

    return (
      <View style={styles.container}>
        <Image 
          source={require('../assets/images/turkish_airlines_logo.png')} 
          style={styles.backgroundImage}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.message}>Doğru Cevap 4096 Bravo ! Oyun Bitti!</Text>
          <TouchableOpacity style={styles.replayButton} onPress={handleReplay}>
            <Text style={styles.replayButtonText}>Tekrar Oyna</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.paymentContainer}>
          {!paymentSuccess ? (
            <>
              <Text style={styles.paymentText}>
                Yeni bir soruya geçmek istiyorsanız 100 TL ödeyin.
              </Text>
              <TouchableOpacity 
                style={styles.paymentButton} 
                onPress={handlePayment}
              >
                <Text style={styles.paymentButtonText}>Ödeme Yap</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.successText}>Ödeme Başarılı!</Text>
              <TouchableOpacity 
                style={styles.newLevelButton} 
                onPress={handleNewLevel}
              >
                <Text style={styles.newLevelButtonText}>Yeni Level</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Ödeme Modal'ı */}
        <Modal 
          isVisible={isModalVisible} 
          onBackdropPress={() => setModalVisible(false)} 
          backdropOpacity={0.3}
        >
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
        </Modal>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: '100%',
      height: '100%',
      opacity: 0.3, // Görselin şeffaflık oranını arttırdım
      resizeMode: 'cover',
    },
    contentContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: 25,
      borderRadius: 15,
      alignItems: 'center',
      marginBottom: 25,
      elevation: 5, // Gölgeleme ekledim
    },
    message: {
      fontSize: 26, // Font boyutunu biraz arttırdım
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 15,
      color: '#FF6F61',
    },
    replayButton: {
      backgroundColor: '#4CAF50',
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 8,
      marginVertical: 10,
    },
    replayButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
    },
    paymentContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      width: '80%',
      elevation: 5,
    },
    paymentText: {
      fontSize: 20, // Font boyutunu biraz arttırdım
      textAlign: 'center',
      color: '#FF6F61',
      marginBottom: 15,
    },
    successText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#4CAF50',
    },
    paymentButton: {
      backgroundColor: '#FF6F61',
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 8,
      marginVertical: 10,
    },
    paymentButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
    },
    newLevelButton: {
      backgroundColor: '#4CAF50',
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 8,
      marginTop: 15,
    },
    newLevelButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
    },
    modalContainer: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
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
